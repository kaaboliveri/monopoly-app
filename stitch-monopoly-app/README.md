# Stitch Monopoly

Application de jeu de Monopoly thématisée Stitch, développée en TypeScript avec React et Node.js.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm

### Installation

1. **Installer les dépendances du serveur:**
```bash
cd server
npm install
```

2. **Installer les dépendances du client:**
```bash
cd client
npm install
```

### Lancement en développement

**Option 1 : Lancement individuel**

Terminal 1 (Serveur):
```bash
cd server
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

Le serveur démarre sur `http://localhost:3000`  
Le client démarre sur `http://localhost:5173`

## 📁 Structure du projet

```
stitch-monopoly-app/
├── client/              # Application React (Frontend)
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── features/    # Fonctionnalités (Lobby, Game, etc.)
│   │   ├── hooks/       # Hooks personnalisés
│   │   ├── store/       # État global (Zustand)
│   │   └── types/       # Types TypeScript
│   └── ...
├── server/              # API & WebSocket (Backend)
│   ├── src/
│   │   ├── controllers/ # Logique HTTP
│   │   ├── gateways/    # Logique WebSocket
│   │   ├── models/      # Schémas BDD
│   │   └── services/    # Logique métier
│   └── ...
└── docker-compose.yml   # Configuration Docker complète
```

## 🎮 Fonctionnalités actuelles

### ✅ Phase 1 : Lobby (Complété)
- Création de partie avec code unique
- Système de connexion temps réel (Socket.io)
- Affichage des joueurs dans le lobby

### 🔄 En cours
- Interface du plateau de jeu
- Système de déplacement des pions
- Gestion des propriétés

## 🛠️ Stack technique

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand, Socket.io-client
- **Backend:** Node.js, Express, Socket.io, TypeScript
- **Base de données (à venir):** PostgreSQL, Redis
- **DevOps:** Docker, Docker Compose

## 📝 État du développement

**Module actuel:** Phase 1 - Fondations & Core Loop  
**Progression:** 30% du MVP

---

**Développé dans le cadre du projet Stitch Monopoly**
