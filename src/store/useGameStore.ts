import { create } from 'zustand';
import { GameState, Player, GameScreen, PlayerConfig } from '../types/game.types';
import { GAME_CONFIG, BOARD_DATA } from '../engine/constants';
import { Card, CHANCE_CARDS, COMMUNITY_CARDS, shuffleDeck, drawCard } from '../engine/cards';

interface GameStore extends GameState {
    currentScreen: GameScreen;

    // Modal state
    showPurchaseModal: boolean;
    currentCellId: number | null;

    // Special cards state
    chanceDeck: Card[];
    communityDeck: Card[];
    currentCard: Card | null;
    showCardModal: boolean;

    // Special modals
    showTaxModal: boolean;
    showJailModal: boolean;

    // Movement animation
    isMoving: boolean;
    movementPath: number[];
    currentMovementStep: number;

    // Actions
    startGameWithConfig: (playersConfig: PlayerConfig[]) => void;
    rollDice: () => void;
    buyProperty: (cellId: number) => void;
    skipProperty: () => void;
    endTurn: () => void;
    setScreen: (screen: GameScreen) => void;
    resetGame: () => void;

    // Special actions
    applyCardEffect: () => void;
    closeCardModal: () => void;
    payTax: (amount: number) => void;

    // Movement animation actions
    startMovementAnimation: (totalSteps: number) => void;
    advanceMovement: () => void;
    completeMovement: () => void;
}

const createPlayer = (name: string, token: string, isAI: boolean): Player => ({
    id: isAI ? `ai-${Date.now()}-${Math.random()}` : `player-${Date.now()}-${Math.random()}`,
    name,
    token,
    money: GAME_CONFIG.STARTING_MONEY,
    position: 0,
    properties: [],
    inJail: false,
    jailTurns: 0,
    isAI,
    isBankrupt: false,
});

export const useGameStore = create<GameStore>((set, get) => ({
    // État initial
    players: [],
    currentPlayerIndex: 0,
    diceValues: null,
    winner: null,
    gameStarted: false,
    currentScreen: 'menu',
    showPurchaseModal: false,
    currentCellId: null,

    // États pour les cartes
    chanceDeck: shuffleDeck(CHANCE_CARDS),
    communityDeck: shuffleDeck(COMMUNITY_CARDS),
    currentCard: null,
    showCardModal: false,

    // États pour les modales spéciales
    showTaxModal: false,
    showJailModal: false,

    // États pour l'animation de mouvement
    isMoving: false,
    movementPath: [],
    currentMovementStep: 0,

    // Démarrer la partie avec configuration
    startGameWithConfig: (playersConfig) => {
        const newPlayers = playersConfig.map(p => createPlayer(p.name, p.token, p.isAI));

        set({
            players: newPlayers,
            currentPlayerIndex: 0,
            diceValues: null,
            winner: null,
            gameStarted: true,
            currentScreen: 'game',
            showPurchaseModal: false,
            currentCellId: null,
            chanceDeck: shuffleDeck(CHANCE_CARDS),
            communityDeck: shuffleDeck(COMMUNITY_CARDS),
            currentCard: null,
            showCardModal: false,
            showTaxModal: false,
            showJailModal: false,
        });
    },

    // Lancer les dés
    rollDice: () => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const total = dice1 + dice2;

        set((state) => {
            // Démarrer l'animation de mouvement avec le nombre total de cases
            get().startMovementAnimation(total);

            return {
                diceValues: [dice1, dice2],
            };
        });

        // Délai avant de commencer le mouvement (après l'arrêt des dés)
        setTimeout(() => {
            get()._startAnimatedMovement();
        }, 1700); // Après la fin de l'animation des dés (1.7s)
    },

    // Démarrer l'animation de mouvement étape par étape
    _startAnimatedMovement: () => {
        const state = get();
        const total = (state.diceValues?.[0] || 0) + (state.diceValues?.[1] || 0);

        if (total === 0 || !state.isMoving) return;

        // Animer le mouvement case par case
        const animateStep = (stepIndex: number) => {
            if (stepIndex >= total) {
                // Mouvement terminé, traiter les effets finaux
                setTimeout(() => {
                    get()._processFinalMovement();
                }, 300); // Petit délai après le dernier mouvement
                return;
            }

            // Avancer d'une étape
            get().advanceMovement();

            // Programmer la prochaine étape
            setTimeout(() => {
                animateStep(stepIndex + 1);
            }, 400); // 400ms par case pour une animation fluide
        };

        // Démarrer l'animation
        animateStep(0);
    },

    // Traiter les effets du mouvement une fois l'animation terminée
    _processFinalMovement: () => {
        const state = get();
        const total = (state.diceValues?.[0] || 0) + (state.diceValues?.[1] || 0);
        const currentPlayer = state.players[state.currentPlayerIndex];

        // Calculer la position finale
        let finalPosition = (currentPlayer.position + total) % 40;
        const cell = BOARD_DATA[finalPosition];

        // Bonus case Départ
        let moneyBonus = 0;
        if (finalPosition < currentPlayer.position) {
            moneyBonus = GAME_CONFIG.GO_BONUS;
        }

        // Variables pour les modales spéciales
        let showCard = false;
        let cardDrawn: Card | null = null;
        let newChanceDeck = state.chanceDeck;
        let newCommunityDeck = state.communityDeck;
        let showTax = false;
        let goToJail = false;

        // Gestion des cases spéciales
        if (cell.type === 'go-to-jail') {
            // Allez en prison !
            finalPosition = 10;
            goToJail = true;
        } else if (cell.type === 'chance') {
            // Piocher une carte Chance
            const { card, newDeck } = drawCard(state.chanceDeck);
            cardDrawn = card;
            newChanceDeck = newDeck;
            showCard = true;
        } else if (cell.type === 'community') {
            // Piocher une carte Caisse de Communauté
            const { card, newDeck } = drawCard(state.communityDeck);
            cardDrawn = card;
            newCommunityDeck = newDeck;
            showCard = true;
        } else if (cell.type === 'tax') {
            // Afficher modale de taxe
            showTax = true;
        }

        // Paiement loyer si propriété adverse (sauf si on va en prison ou on pioche une carte)
        let rentPayment = 0;
        const cellOwner = state.players.find(p => p.properties.includes(finalPosition));

        if (!goToJail && !showCard && !showTax && cellOwner && cellOwner.id !== currentPlayer.id && cell.type === 'property') {
            rentPayment = cell.rent || 0;
        }

        // Mise à jour des joueurs avec la nouvelle position et bonus d'argent
        const updatedPlayers = state.players.map((p, i) => {
            if (i === state.currentPlayerIndex) {
                return {
                    ...p,
                    position: finalPosition,
                    money: p.money + moneyBonus - rentPayment,
                    inJail: goToJail || p.inJail,
                    jailTurns: goToJail ? 3 : p.jailTurns,
                };
            } else if (cellOwner && p.id === cellOwner.id) {
                // Propriétaire : reçoit le loyer
                return { ...p, money: p.money + rentPayment };
            }
            // Toujours créer une nouvelle référence pour la détection de changement
            return { ...p };
        });

        // Afficher modale d'achat si propriété disponible ET pas de case spéciale
        const shouldShowPurchaseModal = Boolean(
            !goToJail &&
            !showCard &&
            !showTax &&
            cell.type === 'property' &&
            !cellOwner &&
            cell.price &&
            currentPlayer.money >= cell.price
        );

        set({
            players: updatedPlayers,
            showPurchaseModal: shouldShowPurchaseModal,
            currentCellId: finalPosition,
            // Nouveaux états pour les cases spéciales
            showCardModal: showCard,
            currentCard: cardDrawn,
            chanceDeck: newChanceDeck,
            communityDeck: newCommunityDeck,
            showTaxModal: showTax,
            showJailModal: goToJail,
            isMoving: false,
            movementPath: [],
            currentMovementStep: 0,
        });
    },

    // Acheter une propriété
    buyProperty: (cellId: number) => {
        set((state) => {
            const currentPlayer = state.players[state.currentPlayerIndex];
            const cell = BOARD_DATA.find(c => c.id === cellId);

            if (!cell || !cell.price || currentPlayer.money < cell.price) {
                return state;
            }

            const updatedPlayers = state.players.map((p, i) =>
                i === state.currentPlayerIndex
                    ? {
                        ...p,
                        money: p.money - cell.price!,
                        properties: [...p.properties, cellId],
                    }
                    : p
            );

            return {
                players: updatedPlayers,
                showPurchaseModal: false,
                currentCellId: null,
            };
        });
    },

    // Ignorer l'achat
    skipProperty: () => {
        set({
            showPurchaseModal: false,
            currentCellId: null,
        });
    },

    // Fin de tour
    endTurn: () => {
        set((state) => {
            let updatedPlayers = [...state.players];
            const currentPlayer = updatedPlayers[state.currentPlayerIndex];

            // Vérifier faillite
            if (currentPlayer.money < 0) {
                updatedPlayers[state.currentPlayerIndex] = {
                    ...currentPlayer,
                    isBankrupt: true,
                    money: 0,
                    properties: [] // Retourner propriétés à la banque (simplification)
                };
            }

            // Vérifier victoire
            const activePlayers = updatedPlayers.filter(p => !p.isBankrupt);
            if (activePlayers.length === 1) {
                return {
                    players: updatedPlayers,
                    winner: activePlayers[0].name,
                    currentScreen: 'end',
                };
            }

            // Trouver le prochain joueur non en faillite
            let nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
            while (updatedPlayers[nextPlayerIndex].isBankrupt) {
                nextPlayerIndex = (nextPlayerIndex + 1) % state.players.length;
            }

            return {
                players: updatedPlayers,
                currentPlayerIndex: nextPlayerIndex,
                diceValues: null,
                showPurchaseModal: false,
                currentCellId: null,
            };
        });
    },

    // Changer d'écran
    setScreen: (screen) => set({ currentScreen: screen }),

    // Réinitialiser
    resetGame: () => set({
        players: [],
        currentPlayerIndex: 0,
        diceValues: null,
        winner: null,
        gameStarted: false,
        currentScreen: 'menu',
        showPurchaseModal: false,
        currentCellId: null,
        chanceDeck: shuffleDeck(CHANCE_CARDS),
        communityDeck: shuffleDeck(COMMUNITY_CARDS),
        currentCard: null,
        showCardModal: false,
        showTaxModal: false,
        showJailModal: false,
    }),

    // Appliquer l'effet d'une carte
    applyCardEffect: () => {
        const state = get();
        const { currentCard, players, currentPlayerIndex } = state;

        if (!currentCard) return;

        const currentPlayer = players[currentPlayerIndex];
        const effect = currentCard.effect;

        let updatedPlayers = [...players];
        let newPosition = currentPlayer.position;

        switch (effect.type) {
            case 'money':
                updatedPlayers = players.map((p, i) =>
                    i === currentPlayerIndex
                        ? { ...p, money: p.money + effect.amount }
                        : { ...p }
                );
                break;

            case 'move':
                newPosition = effect.position;
                const passedGo = newPosition < currentPlayer.position && effect.position !== 10;
                const goBonus = passedGo ? GAME_CONFIG.GO_BONUS : 0;

                updatedPlayers = players.map((p, i) =>
                    i === currentPlayerIndex
                        ? { ...p, position: newPosition, money: p.money + goBonus }
                        : { ...p }
                );
                break;

            case 'moveRelative':
                newPosition = (currentPlayer.position + effect.steps + 40) % 40;
                updatedPlayers = players.map((p, i) =>
                    i === currentPlayerIndex
                        ? { ...p, position: newPosition }
                        : { ...p }
                );
                break;

            case 'jail':
                updatedPlayers = players.map((p, i) =>
                    i === currentPlayerIndex
                        ? { ...p, position: 10, inJail: true, jailTurns: 3 }
                        : { ...p }
                );
                break;

            case 'jailFree':
                // Pour l'instant, simplement donner l'argent équivalent
                updatedPlayers = players.map((p, i) =>
                    i === currentPlayerIndex
                        ? { ...p, money: p.money + 50 }
                        : { ...p }
                );
                break;

            case 'payPlayers':
                const totalToPay = effect.amount * (players.length - 1);
                updatedPlayers = players.map((p, i) =>
                    i === currentPlayerIndex
                        ? { ...p, money: p.money - totalToPay }
                        : { ...p, money: p.money + effect.amount }
                );
                break;

            case 'repairs':
                // Simplification : pas encore de bâtiments implémentés
                // Pour l'instant, on ne fait rien
                break;
        }

        set({
            players: updatedPlayers,
            showCardModal: false,
            currentCard: null,
        });
    },

    // Fermer la modale de carte sans appliquer l'effet
    closeCardModal: () => set({
        showCardModal: false,
        currentCard: null,
    }),

    // Payer une taxe
    payTax: (amount: number) => {
        set((state) => ({
            players: state.players.map((p, i) =>
                i === state.currentPlayerIndex
                    ? { ...p, money: p.money - amount }
                    : { ...p }
            ),
            showTaxModal: false,
        }));
    },

    // Démarrer l'animation de mouvement
    startMovementAnimation: (totalSteps: number) => {
        const currentPlayer = get().players[get().currentPlayerIndex];
        const path = [];

        for (let i = 1; i <= totalSteps; i++) {
            path.push((currentPlayer.position + i) % 40);
        }

        set({
            isMoving: true,
            movementPath: path,
            currentMovementStep: 0,
        });
    },

    // Avancer d'une étape dans le mouvement
    advanceMovement: () => {
        set((state) => {
            const nextStep = state.currentMovementStep + 1;

            if (nextStep >= state.movementPath.length) {
                // Mouvement terminé
                const finalPosition = state.movementPath[state.movementPath.length - 1];
                const updatedPlayers = state.players.map((p, i) =>
                    i === state.currentPlayerIndex
                        ? { ...p, position: finalPosition }
                        : { ...p }
                );

                return {
                    players: updatedPlayers,
                    isMoving: false,
                    movementPath: [],
                    currentMovementStep: 0,
                };
            } else {
                // Continuer le mouvement
                return {
                    currentMovementStep: nextStep,
                };
            }
        });
    },

    // Terminer immédiatement le mouvement (pour les cas spéciaux)
    completeMovement: () => {
        set((state) => {
            const finalPosition = state.movementPath[state.movementPath.length - 1] || state.players[state.currentPlayerIndex].position;
            const updatedPlayers = state.players.map((p, i) =>
                i === state.currentPlayerIndex
                    ? { ...p, position: finalPosition }
                    : { ...p }
            );

            return {
                players: updatedPlayers,
                isMoving: false,
                movementPath: [],
                currentMovementStep: 0,
            };
        });
    },
}));
