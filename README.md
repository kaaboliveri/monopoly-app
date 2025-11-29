# 🎲 Monopoly 3D - Jeu de Société Révolutionnaire

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.0-yellow.svg)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-4.4.7-orange.svg)](https://zustand-demo.pmnd.rs/)

Un jeu de Monopoly moderne et immersif avec des animations 3D révolutionnaires, des pions physiques réalistes et une expérience utilisateur exceptionnelle.

## ✨ Fonctionnalités Principales

### 🎮 Gameplay Complet
- **Règles authentiques** du Monopoly classique
- **Jusqu'à 6 joueurs** (humains et IA)
- **Toutes les cases spéciales** : Départ, Prison, Chance, Caisse de Communauté
- **Système de propriétés** complet avec loyers et enchères
- **Gestion de l'argent** et bankruptcy

### 🎲 Dés 3D Révolutionnaires
- **Animation 3D réaliste** de lancer de dés
- **Physique de lancer** avec trajectoire parabolique
- **Rotations multiples** sur tous les axes
- **Synchronisation parfaite** avec les mouvements des pions

### 🎨 Pions 3D Uniques
Chaque joueur a une **forme géométrique 3D distinctive** avec des animations physiques réalistes :

- 🔴 **Cylindre** (Rouge) - Roulement latéral comme une voiture
- 🔵 **Cône** (Turquoise) - Rotation verticale élégante
- 🔵 **Cube** (Bleu) - Petits bonds angulaires
- 🟠 **Sphère** (Orange) - Roulement 3D fluide
- 🟣 **Pyramide** (Violet) - Glissement latéral
- 🟢 **Octaèdre** (Vert) - Rotation complexe sur arêtes

### 🎭 Interface Utilisateur
- **Design moderne** avec effets de verre et gradients
- **Animations fluides** et transitions élégantes
- **Responsive design** adapté à tous les écrans
- **Feedback visuel** riche et intuitif

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/votre-username/monopoly-3d.git
cd monopoly-3d

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Construction pour la production
```bash
# Build optimisé
npm run build

# Prévisualisation du build
npm run preview
```

## 🎯 Technologies Utilisées

### Frontend
- **React 18** - Framework UI moderne
- **TypeScript** - Typage statique robuste
- **Vite** - Outil de build ultra-rapide
- **CSS Modules** - Styles scoped et maintenables

### State Management
- **Zustand** - Gestion d'état simple et puissante
- **Stores modulaires** pour une architecture propre

### Animations & UI
- **CSS 3D Transforms** - Animations 3D natives
- **SVG Animations** - Graphiques vectoriels fluides
- **Cubic-bezier easing** - Transitions naturelles

## 📁 Structure du Projet

```
monopoly-3d/
├── src/
│   ├── components/
│   │   ├── Board/          # Plateau de jeu et pions
│   │   ├── Dice/           # Composant dés 3D
│   │   └── Modal/          # Modales du jeu
│   ├── screens/            # Écrans principaux
│   │   ├── MenuScreen.tsx  # Menu principal
│   │   ├── LobbyScreen.tsx # Configuration partie
│   │   ├── GameScreen.tsx  # Écran de jeu
│   │   └── EndScreen.tsx   # Écran de fin
│   ├── store/              # Gestion d'état
│   ├── engine/             # Logique métier
│   └── types/              # Types TypeScript
├── public/                 # Assets statiques
└── dist/                   # Build de production
```

## 🎮 Comment Jouer

1. **Configuration** : Choisissez le nombre de joueurs et leurs types (humain/IA)
2. **Lancer les dés** : Cliquez sur "🎲 Lancer les dés" pour des animations 3D spectaculaires
3. **Déplacement** : Les pions se déplacent case par case avec des animations physiques
4. **Actions** : Achetez des propriétés, payez des loyers, tirez des cartes
5. **Victoire** : Soyez le dernier joueur solvent !

## 🎨 Personnalisation

### Ajouter de Nouvelles Formes de Pions
Modifiez `src/components/Board/MonopolyBoard.tsx` dans la fonction `renderPlayer3D()`.

### Modifier les Couleurs
Ajustez les couleurs dans `src/components/Board/MonopolyBoard.module.css`.

### Personnaliser les Animations
Modifiez les keyframes dans le même fichier CSS.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- 🐛 Reporter des bugs
- 💡 Proposer de nouvelles fonctionnalités
- 🔧 Soumettre des pull requests
- 📖 Améliorer la documentation

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Inspiration du jeu de société Monopoly®
- Communauté React et TypeScript
- Librairies open source utilisées

---

**🎲 Prêt à vivre l'expérience Monopoly ultime en 3D ? Lancez le jeu maintenant !**