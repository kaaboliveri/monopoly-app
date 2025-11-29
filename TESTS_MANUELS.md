# 🧪 GUIDE DE TESTS MANUELS - Stitch Monopoly

## 📋 Checklist Complète

### ✅ Catégorie 1 : Menu Principal

- [ ] **Affichage**
  - [ ] Image de fond chargée correctement
  - [ ] Bouton "Nouvelle Partie" visible et centré
  - [ ] Responsive mobile (taille écran < 768px)
  - [ ] Responsive desktop (taille écran > 768px)

- [ ] **Fonctionnalité**
  - [ ] Clic sur "Nouvelle Partie" lance le jeu
  - [ ] Transition fluide vers l'écran de jeu
  - [ ] Pas d'erreurs console

---

### ✅ Catégorie 2 : Plateau de Jeu

- [ ] **Affichage Initial**
  - [ ] Plateau visible avec image de fond
  - [ ] 2 pions affichés sur case Départ (0)
  - [ ] Pion joueur (bleu/violet)
  - [ ] Pion IA (rose/rouge)
  - [ ] HUD visible avec 1500€ pour chaque joueur

- [ ] **Interface**
  - [ ] Bouton "Lancer les dés" actif
  - [ ] Bouton "Fin de tour" désactivé (grisé)
  - [ ] Noms des joueurs affichés correctement
  - [ ] Propriétés = 0 au départ

---

### ✅ Catégorie 3 : Dés & Déplacement

- [ ] **Lancer de Dés**
  - [ ] Clic sur "Lancer les dés" fonctionne
  - [ ] 2 dés Unicode s'affichent (⚀ à ⚅)
  - [ ] Valeurs correctes (1-6 chacun)
  - [ ] Bouton "Lancer les dés" se désactive
  - [ ] Bouton "Fin de tour" s'active

- [ ] **Déplacement du Pion**
  - [ ] Pion se déplace à la position correcte
  - [ ] Transition visuelle fluide
  - [ ] Position affichée dans HUD correspond
  - [ ] Nom de la case affiché (ex: "Rue Lecourbe")

- [ ] **Bonus Case Départ**
  - [ ] Lancer dés qui fait un tour complet
  - [ ] Vérifier argent : devrait augmenter de +200€
  - [ ] Message dans console (F12) si implémenté

---

### ✅ Catégorie 4 : Achat de Propriétés

- [ ] **Déclenchement Modale**
  - [ ] Tomber sur propriété libre → Modale s'affiche
  - [ ] Titre : "🏠 Achat de propriété"
  - [ ] Nom de la propriété coloré selon groupe
  - [ ] Prix affiché correctement
  - [ ] Loyer affiché
  - [ ] Argent restant visible

- [ ] **Action "Acheter"**
  - [ ] Clic sur "Acheter" fonctionne
  - [ ] Argent débité correctement
  - [ ] Propriété ajoutée à la liste (HUD)
  - [ ] Modale se ferme
  - [ ] Compteur propriétés augmente

- [ ] **Action "Ignorer"**
  - [ ] Clic sur "Ignorer" ferme la modale
  - [ ] Argent inchangé
  - [ ] Propriétés inchangées

- [ ] **Validation Budget**
  - [ ] Si argent < prix → Bouton "Acheter" désactivé
  - [ ] Couleur grise sur bouton désactivé

---

### ✅ Catégorie 5 : Paiement Loyers

- [ ] **Propriété Adverse**
  - [ ] Acheter une propriété (tour joueur)
  - [ ] Laisser l'IA tomber dessus
  - [ ] Vérifier : argent joueur augmente du loyer
  - [ ] Vérifier : argent IA diminue du loyer
  - [ ] Pas de modale d'achat (propriété déjà possédée)

- [ ] **Inversement**
  - [ ] IA achète une propriété
  - [ ] Joueur tombe dessus
  - [ ] Vérifier paiement automatique
  - [ ] Argent joueur diminue
  - [ ] Argent IA augmente

---

### ✅ Catégorie 6 : Intelligence Artificielle

- [ ] **Détection Tour IA**
  - [ ] Après "Fin de tour" joueur → Tour IA démarre
  - [ ] Message "🤖 L'IA réfléchit..." s'affiche
  - [ ] Boutons désactivés pendant tour IA

- [ ] **Actions Automatiques**
  - [ ] IA lance les dés automatiquement (1-2s)
  - [ ] Pion IA se déplace
  - [ ] **SI propriété libre ET prix < 40% argent**:
    - [ ] IA achète (vérifier argent débité)
    - [ ] Propriétés IA augmentent
  - [ ] **SI propriété trop chère**:
    - [ ] IA n'achète pas
    - [ ] Argent inchangé
  - [ ] IA termine son tour automatiquement (1-2s)
  - [ ] Retour au tour du joueur

- [ ] **Logs Console (F12)**
  - [ ] "🤖 IA: Réflexion avant de lancer les dés..."
  - [ ] "🤖 IA: Lance les dés"
  - [ ] "🤖 IA: Achète la propriété #X" OU "Ignore la propriété #X"
  - [ ] "🤖 IA: Fin de tour"

---

### ✅ Catégorie 7 : Fin de Partie

- [ ] **Détection Faillite**
  - [ ] Jouer jusqu'à ce qu'un joueur ait argent < 0
  - [ ] Écran de fin s'affiche automatiquement
  - [ ] Message de victoire/défaite correct

- [ ] **Écran Fin de Partie**
  - [ ] Image de fond chargée
  - [ ] Nom du gagnant affiché
  - [ ] Bouton "🔄 Rejouer" visible
  - [ ] Clic sur "Rejouer" → Retour au menu

---

### ✅ Catégorie 8 : Performance & UX

- [ ] **Fluidité**
  - [ ] Pas de lag lors des déplacements
  - [ ] Animations des  dés fluides
  - [ ] Transitions modales sans saccades

- [ ] **Responsive**
  - [ ] Tester sur mobile (viewport < 768px)
  - [ ] Tester sur tablette (768-1024px)
  - [ ] Tester sur desktop (> 1024px)
  - [ ] Tous les éléments visibles
  - [ ] Pas de scroll horizontal

- [ ] **Console Navigateur**
  - [ ] Pas d'erreurs rouges
  - [ ] Pas d'avertissements critiques
  - [ ] Logs IA visibles (si debug activé)

---

## 🐛 Bugs Potentiels à Vérifier

### Priorité Haute 🔴
- [ ] Pions superposés sur même case
- [ ] Argent négatif non détecté
- [ ] Acheter propriété déjà possédée
- [ ] IA ne joue pas son tour
- [ ] Boucle infinie tour IA

### Priorité Moyenne 🟡
- [ ] Délais IA trop courts/longs
- [ ] Modale ne se ferme pas
- [ ] Boutons restent désactivés
- [ ] Compteur propriétés incorrect

### Priorité Basse 🟢
- [ ] Couleurs pions peu visibles
- [ ] Texte tronqué sur mobile
- [ ] Dés Unicode non supportés (navigateurs anciens)

---

## 📊 Scénarios de Test Complets

### Scénario 1 : Partie Normale (5 min)
1. Lancer le jeu
2. Jouer 5 tours complets (joueur + IA)
3. Acheter au moins 2 propriétés
4. Laisser l'IA acheter au moins 1 propriété
5. Payer un loyer
6. Vérifier tous les compteurs

### Scénario 2 : Partie Rapide vers Faillite (3 min)
1. Ouvrir console (F12)
2. Modifier manuellement `players[0].money = 50`
3. Jouer jusqu'à tomber sur propriété > 50€
4. Acheter pour passer en négatif
5. Vérifier écran fin de partie

### Scénario 3 : Test IA (10 min)
1. Lancer partie
2. NE PAS acheter de propriétés
3. Observer seulement l'IA
4. Noter ses décisions d'achat
5. Vérifier cohérence (prix < 40% argent)

---

## ✅ Validation Finale

**Critères de Succès** :
- [ ] 0 bugs bloquants (priorité haute)
- [ ] < 3 bugs moyens (priorité moyenne)
- [ ] Partie complète jouable de A à Z
- [ ] IA prend des décisions cohérentes
- [ ] Performance fluide (pas de lag)
- [ ] Responsive sur mobile/desktop

**Résultat** :
- ✅ **VALIDÉ** → Prêt pour déploiement
- ❌ **REFUSÉ** → Corrections nécessaires

---

**Temps de test complet** : ~30 minutes  
**Testeur** : [Votre nom]  
**Date** : ___________  
**Navigateur** : ___________  
**Résolution** : ___________
