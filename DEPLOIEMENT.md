# 🚀 GUIDE DE DÉPLOIEMENT - Stitch Monopoly

## 📦 Préparation

### ✅ Checklist Pré-Déploiement

- [x] Build production fonctionne : `npm run build`
- [x] Tests manuels validés (voir `TESTS_MANUELS.md`)
- [x] Pas d'erreurs TypeScript
- [x] Assets PNG copiés dans `public/assets/`
- [ ] Git repository créé et pushlors

---

## 🌐 OPTION 1 : Déploiement Vercel (RECOMMANDÉ)

**Durée** : 5 minutes  
**Coût** : Gratuit  
**Difficulté** : ⭐ Très facile

### Étape 1 : Créer compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. "Sign Up" avec GitHub
3. Autorisez Vercel à accéder à vos repos

### Étape 2 : Push sur GitHub

```bash
# Dans le dossier stitch-monopoly-game
git init
git add .
git commit -m "Initial commit - Monopoly MVP complet"
git branch -M main

# Créez un repo sur GitHub puis:
git remote add origin https://github.com/VOTRE_USERNAME/stitch-monopoly.git
git push -u origin main
```

### Étape 3 : Importer sur Vercel

1. Dashboard Vercel → "New Project"
2. "Import Git Repository" → Sélectionnez `stitch-monopoly`
3. **Configuration** :
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
4. Cliquez "Deploy"

### Étape 4 : Attendre le build (1-2 min)

Vercel va :
- Installer les dépendances
- Compiler TypeScript
- Bundler avec Vite
- Déployer

### Étape 5 : Accéder au site

URL fournie : `https://stitch-monopoly-XXXXXX.vercel.app`

###⚠️ IMPORTANT : Assets PNG

**Limites Vercel** : Ne peut pas détecter automatiquement les assets PNG externes.

**Solution** :
1. Après le premier déploiement
2. Dashboard Vercel → Votre projet → "Settings" → "Environment Variables"
3. OU : Uploadez manuellement les assets via Vercel CLI

```bash
# Installation Vercel CLI
npm i -g vercel

# Login
vercel login

# Upload assets
vercel --prod
# Puis uploadez public/assets/ manuellement
```

---

## 🌐 OPTION 2 : Netlify

**Durée** : 5 minutes  
**Coût** : Gratuit  
**Difficulté** : ⭐ Très facile

### Étape 1 : Créer compte Netlify

1. [netlify.com](https://netlify.com)
2. "Sign Up" avec GitHub

### Étape 2 : Déployer

**Méthode A : Drag & Drop**
1. `npm run build`
2. Netlify Dashboard → "Sites" → "Add new site" → "Deploy manually"
3. Glissez le dossier `dist/` + `public/assets/`

**Méthode B : Git**
1. Push sur GitHub (voir Vercel)
2. Netlify → "New site from Git"
3. Configuration :
   ```
   Build command: npm run build
   Publish directory: dist
   ```

---

## 🌐 OPTION 3 : GitHub Pages

**Durée** : 10 minutes  
**Coût** : Gratuit  
**Difficulté** : ⭐⭐ Moyen

### Configuration requise

1. Créer `vite.config.ts` modifié :

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/stitch-monopoly/', // Nom de votre repo
})
```

2. Installer gh-pages :

```bash
npm install -D gh-pages
```

3. Ajouter scripts dans `package.json` :

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Déployer :

```bash
npm run deploy
```

5. GitHub → Settings → Pages → Source : `gh-pages` branch

URL : `https://VOTRE_USERNAME.github.io/stitch-monopoly/`

---

## 🌐 OPTION 4 : Build Manuel + Hébergeur Custom

**Pour** : AWS S3, Azure Static Web Apps, etc.

### Étape 1 : Build

```bash
npm run build
```

### Étape 2 : Récupérer dist/

Le dossier `dist/` contient :
```
dist/
├── index.html
├── assets/
│   ├── index-XXXXX.js (bundle JS)
│   ├── index-XXXXX.css (styles)
│   └── ...
└── vite.svg
```

### Étape 3 : Upload

Uploadez **tout le contenu de `dist/`** + `public/assets/` sur votre hébergeur.

**Important** : Configuration serveur pour SPA (Single Page App) :
- Toutes les routes doivent pointer vers `index.html`
- Exemple Nginx :
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

---

## 🔧 Configuration Post-Déploiement

### Variables d'Environnement (si nécessaire)

Si vous ajoutez des features nécessitant des clés API :

```bash
# Vercel
vercel env add API_KEY

# Netlify
netlify env:set API_KEY "valeur"
```

### Custom Domain

**Vercel** :
1. Settings → Domains → Add
2. Suivre instructions DNS

**Netlify** :
1. Domain settings → Add custom domain
2. Configurer DNS

---

## 🧪 Vérification Post-Déploiement

### Checklist

- [ ] Site accessible via URL
- [ ] Menu principal s'affiche
- [ ] Images de fond chargées
- [ ] "Nouvelle Partie" fonctionne
- [ ] Pions visibles sur plateau
- [ ] Dés fonctionnent
- [ ] IA joue automatiquement
- [ ] Pas d'erreurs console (F12)

### Tests Performance

```bash
# Google Lighthouse
1. Ouvrir site en production
2. F12 → Lighthouse
3. "Generate report"
4. Score > 90 = bon
```

---

## 🐛 Dépannage

### "Page blanche" après déploiement

**Cause** : Chemins assets incorrects

**Solution** :
1. Vérifiez `vite.config.ts` → `base: '/'`
2. Vérifiez que `public/assets/` est bien inclus dans le build

### Assets PNG ne chargent pas

**Cause** : Dossier `public/` non uploadé

**Solution** :
- Vérifiez que `public/assets/` existe
- Re-build : `npm run build`
- Re-deploy

### Build échoue sur Vercel

**Cause** : Node version incompatible

**Solution** :
1. Vercel → Settings → Environment Variables
2. Ajouter `NODE_VERSION` = `18.x`
3. Re-deploy

### IA ne joue pas en production

**Cause** : Erreur JavaScript

**Solution** :
1. F12 → Console
2. Noter l'erreur
3. Corriger dans le code
4. Re-build + Re-deploy

---

## 📊 Monitoring Post-Lancement

### Analytics (Optionnel)

**Vercel Analytics** :
```bash
npm install @vercel/analytics
```

```tsx
// src/main.tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

**Google Analytics** :
Ajoutez le script dans `index.html`

---

## 🎉 Félicitations !

Votre jeu Monopoly est maintenant **EN LIGNE** ! 🚀

**Prochaines étapes** :
1. Partagez le lien
2. Collectez les feedbacks
3. Itérez sur les améliorations
4. Ajoutez des features (cf. backlog)

---

## 📝 Checklist Finale

- [ ] Site déployé et accessible
- [ ] Tests manuels passent en production
- [ ] Pas d'erreurs console
- [ ] Performance acceptable (Lighthouse > 80)
- [ ] URL partagée avec utilisateurs
- [ ] Documentation mise à jour

---

**URL de Production** : ___________________________  
**Date de Déploiement** : ___________________________  
**Déployé par** : ___________________________
