import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { shouldAIBuyProperty, getAIThinkingDelay, logAIDecision } from '../engine/aiEngine';

/**
 * Hook personnalisé pour gérer automatiquement le tour de l'IA
 * Active les actions automatiques quand c'est le tour de l'IA
 */
export function useAIPlayer() {
    const {
        players,
        currentPlayerIndex,
        rollDice,
        buyProperty,
        skipProperty,
        endTurn,
        diceValues,
        showPurchaseModal,
        currentCellId
    } = useGameStore();

    const currentPlayer = players[currentPlayerIndex];
    const isAITurn = currentPlayer?.isAI;

    useEffect(() => {
        if (!isAITurn) return;

        // Étape 1 : Lancer les dés automatiquement
        if (diceValues === null) {
            const delay = getAIThinkingDelay();
            logAIDecision('Réflexion avant de lancer les dés...');

            const timer = setTimeout(() => {
                logAIDecision('Lance les dés');
                rollDice();
            }, delay);

            return () => clearTimeout(timer);
        }

        // Étape 2 : Décider d'acheter ou non (si modale visible)
        if (showPurchaseModal && currentCellId !== null) {
            const delay = getAIThinkingDelay();

            const timer = setTimeout(() => {
                const shouldBuy = shouldAIBuyProperty(currentPlayer, currentCellId);

                if (shouldBuy) {
                    logAIDecision(`Achète la propriété #${currentCellId}`);
                    buyProperty(currentCellId);
                } else {
                    logAIDecision(`Ignore la propriété #${currentCellId} (trop cher ou pas rentable)`);
                    skipProperty();
                }
            }, delay);

            return () => clearTimeout(timer);
        }

        // Étape 3 : Finir le tour automatiquement
        if (diceValues !== null && !showPurchaseModal) {
            const delay = getAIThinkingDelay();

            const timer = setTimeout(() => {
                logAIDecision('Fin de tour');
                endTurn();
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [
        isAITurn,
        diceValues,
        showPurchaseModal,
        currentCellId,
        currentPlayer,
        rollDice,
        buyProperty,
        skipProperty,
        endTurn
    ]);

    return {
        isAITurn,
        isAIThinking: isAITurn && (diceValues === null || showPurchaseModal)
    };
}
