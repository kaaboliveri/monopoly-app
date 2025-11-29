# Plan d'Implémentation Restant - Monopoly Stitch

Ce document liste les tâches restantes pour finaliser le jeu Monopoly.

## ✅ Tâches Terminées
- [x] **Tâche 1 : Correction Mutations Zustand** (Stabilisation de l'état)
- [x] **Tâche 2 : Plateau Dynamique** (Rendu basé sur les données)
- [x] **Tâche 3 : Cases Spéciales** (Cartes Chance/Communauté, Taxes, Prison)
- [x] **Tâche 4 : Système de Lobby** (Configuration des joueurs)
- [x] **Tâche 5 : Logique de Faillite** (Gestion de la défaite)

## 📝 Tâches à Faire

### Phase 3 : Mécaniques Avancées (Priorité Haute)

#### Tâche 6 : Système de Construction 🏠
- [ ] Ajouter `houses` et `hotels` à l'interface `BoardCell` (déjà présent ?) et `Player`.
- [ ] Créer une action `buildHouse(cellId)` dans le store.
- [ ] Vérifier les règles de construction (posséder tout le groupe de couleur, construction uniforme).
- [ ] Mettre à jour le calcul du loyer en fonction du nombre de maisons.
- [ ] Ajouter une modale ou un bouton pour gérer les constructions.

#### Tâche 7 : Système d'Échange 🤝
- [ ] Créer une interface `TradeOffer`.
- [ ] Ajouter une action `proposeTrade` et `acceptTrade` dans le store.
- [ ] Créer un écran ou une modale d'échange (`TradeModal`).
- [ ] Implémenter la logique d'échange (argent, propriétés, cartes sortie de prison).

#### Tâche 8 : Enchères 🔨
- [ ] Créer un état `AuctionState` dans le store.
- [ ] Déclencher une enchère si un joueur refuse d'acheter une propriété.
- [ ] Créer une modale d'enchères (`AuctionModal`).
- [ ] Gérer les tours d'enchères et l'attribution de la propriété.

### Phase 4 : Sauvegarde et Audio (Priorité Moyenne)

#### Tâche 9 : Sauvegarde/Chargement 💾
- [ ] Utiliser `localStorage` pour persister l'état du jeu via le middleware `persist` de Zustand.
- [ ] Ajouter un bouton "Reprendre la partie" dans le menu principal.

#### Tâche 10 : Effets Sonores 🔊
- [ ] Ajouter des fichiers sons (dés, achat, carte, faillite).
- [ ] Créer un hook `useSound` ou un service audio.
- [ ] Intégrer les sons dans les actions du store ou les composants.

### Phase 5 : Finitions (Priorité Basse)

#### Tâche 11 : Animations ✨
- [ ] Ajouter des animations pour le déplacement des pions (pas à pas).
- [ ] Ajouter des animations pour les dés (roulement 3D ou sprite).
- [ ] Ajouter des transitions pour les modales.

#### Tâche 12 : Tutoriel 📚
- [ ] Créer un mode tutoriel ou des infobulles explicatives.

#### Tâche 13 : Paramètres ⚙️
- [ ] Créer un écran de paramètres (volume, vitesse de jeu, langue).

#### Tâche 14 : Statistiques 📊
- [ ] Suivre les statistiques (tours joués, lancers de dés, loyers perçus).
- [ ] Afficher un écran de statistiques à la fin de la partie.
