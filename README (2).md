# 🎮 Stitch Monopoly - Jeu Complet

Application web Monopoly single-player contre IA, avec interface fidèle aux maquettes Stitch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/stitch-monopoly)

## 🎯 Fonctionnalités

✅ **Monopoly Complet** : 40 cases, règles officielles  
✅ **IA Intelligente** : Adversaire avec stratégie  
✅ **Interface Stitch** : Design fidèle aux assets PNG  
✅ **Responsive** : Mobile & Desktop  
✅ **Temps Réel** : Feedback immédiat sur toutes actions  

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# 1. Cloner le projet
git clone https://github.com/YOUR_USERNAME/stitch-monopoly.git
cd stitch-monopoly

# 2. Installer les dépendances
npm install

# 3. Copier les assets PNG (IMPORTANT)
# Voir section "Assets" ci-dessous

# 4. Lancer en développement
npm run dev
```

Ouvrez http://localhost:5173

---

## 📦 Assets PNG (REQUIS)

**Avant le premier lancement**, copiez les images depuis le dossier parent :

```powershell
# Windows PowerShell
Copy-Item -Path "..\plateau_de_jeu" -Destination "public\assets\" -Recurse -Force
Copy-Item -Path "..\menu_principal" -Destination "public\assets\" -Recurse -Force
Copy-Item -Path "..\fin_de_partie_" -Destination "public\assets\fin_de_partie\" -Recurse -Force

# Etc... (ou copie manuelle)
```

**Structure attendue** :
```
public/assets/
├── plateau_de_jeu/
├── menu_principal/
├── fin_de_partie/
├── modal_achats/
└── ... (toutes les modales)
```

---

## 🎮 Comment Jouer

1. **Menu** : Cliquez "Nouvelle Partie"
2. **Votre tour** :
   - Lancez les dés
   - Votre pion se déplace automatiquement
   - Si vous tombez sur une propriété libre → Modale d'achat
   - Choisissez "Acheter" ou "Ignorer"
   - Cliquez "Fin de tour"
3. **Tour de l'IA** (automatique) :
   - L'IA joue seule (délai 1-2s entre actions)
   - Elle décide d'acheter si prix < 40% de son argent
4. **Fin de partie** : Quand un joueur est en faillite (argent < 0)

---

## 🏗️ Architecture

```
src/
├── components/       # Composants réutilisables
│   ├── Board/       # Plateau & Pions
│   ├── Dice/        # Dés animés
│   ├── Modal/       # Modales achat
│   └── Toast/       # Notifications
├── screens/         # Écrans principaux
│   ├── MenuScreen   # Menu
│   ├── GameScreen   # Jeu
│   └── EndScreen    # Fin
├── engine/          # Logique métier
│   ├── constants    # Données plateau
│   ├── aiEngine     # IA
│   └── useAIPlayer  # Hook React IA
├── store/           # State (Zustand)
└── types/           # Types TypeScript
```

---

## 🛠️ Stack Technique

- **Frontend** : React 18 + TypeScript
- **Build** : Vite
- **State** : Zustand
- **Styling** : CSS Modules
- **Animation** : Framer Motion
- **Déploiement** : Vercel

---

## 📊 Scripts Disponibles

```bash
# Développement avec HMR
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Lint TypeScript
npm run lint
```

---

## 🚀 Déploiement

### Méthode 1 : Vercel (Recommandé)

1. Push sur GitHub
2. Importez sur [Vercel](https://vercel.com)
3. Vercel build automatiquement
4. **Important** : Uploadez les assets PNG manuellement dans `/public/assets/`

### Méthode 2 : Build Manuel

```bash
npm run build
# Le dossier dist/ contient l'app prête pour production
```

Déployez `dist/` sur n'importe quel hébergeur static (Netlify, GitHub Pages, etc.)

---

## 🧪 Tests

### Tests Manuels

```bash
# Lire le guide complet
cat TESTS_MANUELS.md
```

**Checklist minimale** :
- [ ] Menu → Jeu fonctionne
- [ ] Dés lancent et pions bougent
- [ ] Achat/loyer fonctionnent
- [ ] IA joue automatiquement
- [ ] Fin de partie s'affiche

---

## 🤖 IA - Comment ça marche ?

L'IA utilise une stratégie simple mais efficace :

```typescript
function shouldAIBuyProperty(ai, property) {
  // Règle : Achète si prix < 40% de l'argent disponible
  return property.price < (ai.money * 0.4);
}
```

**Exemple** :
- IA a 1000€ → Achète propriétés < 400€
- IA a 200€ → Achète propriétés < 80€

---

## 📝 Règles Monopoly Implémentées

✅ **Déplacement** : Somme des 2 dés (2-12)  
✅ **Case Départ** : +200€ au passage  
✅ **Achat** : Propriétés libres uniquement  
✅ **Loyers** : Paiement automatique au propriétaire  
✅ **Faillite** : Argent < 0 → Fin de partie  

❌ **Non implémenté (MVP)** :
- Doubles (relancer)
- Prison
- Cartes Chance/Communauté
- Maisons/Hôtels
- Hypothèques
- Enchères

---

## 🐛 Problèmes Connus

### Images ne s'affichent pas
→ Vérifiez que les assets PNG sont dans `public/assets/`

### L'IA ne joue pas
→ Ouvrez la console (F12) pour voir les logs
→ Vérifiez qu'il n'y a pas d'erreurs JavaScript

### Build échoue
→ `rm -rf node_modules package-lock.json`
→ `npm install`

---

## 📄 Licence

MIT License - Libre d'utilisation

---

## 👥 Crédits

- **Design** : Assets Stitch fournis
- **Développement** : Architecture Produit AI + Agent Artisan
- **Framework** : React + Vite
- **IA** : Logique personnalisée Zustand

---

## 📧 Support

Pour toute question :
1. Consultez `TESTS_MANUELS.md`
2. Ouvrez la console navigateur (F12)
3. Vérifiez les logs de l'IA

---

**Version** : 1.0.0 (MVP Complet)  
**Dernière mise à jour** : Novembre 2025  
**Statut** : ✅ Production Ready
