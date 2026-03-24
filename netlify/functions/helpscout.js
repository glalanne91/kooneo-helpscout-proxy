exports.handler = async function (event) {
  const HELPSCOUT_API_KEY = process.env.HELPSCOUT_API_KEY;
  const COLLECTION_ID = process.env.HELPSCOUT_COLLECTION_ID;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const query = event.queryStringParameters?.q || "";

  if (!query) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Paramètre q manquant" }),
    };
  }

  try {
    const credentials = Buffer.from(`${HELPSCOUT_API_KEY}:X`).toString("base64");

    const searchUrl = `https://docsapi.helpscout.net/v1/collections/${COLLECTION_ID}/articles?status=published&pageSize=5`;
    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Basic ${credentials}` },
    });

    if (!searchRes.ok) {
      throw new Error(`HelpScout API error: ${searchRes.status}`);
    }

    const data = await searchRes.json();
    const articles = data?.articles?.items || [];

    const keywords = query.toLowerCase().split(" ").filter(Boolean);
    const filtered = articles
      .filter((a) => {
        const text = `${a.name} ${a.preview || ""}`.toLowerCase();
        return keywords.some((k) => text.includes(k));
      })
      .slice(0, 5)
      .map((a) => ({
        id: a.id,
        title: a.name,
        preview: a.preview || "",
        url: `https://help.kooneo.com/article/${a.number}-${a.slug}`,
      }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ results: filtered }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
