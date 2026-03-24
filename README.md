# Kooneo HelpScout Proxy

Fonction Netlify qui sert de proxy entre Claude et l'API HelpScout Docs.

## Déploiement

### 1. Créer un repo GitHub
- Crée un nouveau repo GitHub (ex: `kooneo-helpscout-proxy`)
- Upload tous ces fichiers dedans

### 2. Connecter à Netlify
- Va sur app.netlify.com → "Add new site" → "Import an existing project"
- Connecte ton repo GitHub
- Laisse les paramètres de build vides (pas de framework)
- Clique sur "Deploy"

### 3. Ajouter les variables d'environnement
Dans Netlify → Site → Environment variables, ajoute :
- `HELPSCOUT_API_KEY` → ta clé API HelpScout
- `HELPSCOUT_COLLECTION_ID` → l'ID de ta collection Docs

### 4. Tester
Une fois déployé, ta fonction sera accessible à :
`https://TON-SITE.netlify.app/.netlify/functions/helpscout?q=abonnement`
