import { GAME_CONFIG, BOARD_DATA } from './constants';
import { Player } from '../types/game.types';

/**
 * Décide si l'IA doit acheter une propriété
 * Logique : Achète si le prix < 40% de son argent
 */
export function shouldAIBuyProperty(
    ai: Player,
    cellId: number
): boolean {
    const cell = BOARD_DATA.find(c => c.id === cellId);

    if (!cell || cell.type !== 'property' || !cell.price) {
        return false;
    }

    // Vérifier que la propriété n'est pas déjà possédée
    if (ai.properties.includes(cellId)) {
        return false;
    }

    // Logique d'achat : prix < 40% de l'argent disponible
    const canAfford = ai.money >= cell.price;
    const isGoodDeal = cell.price < (ai.money * GAME_CONFIG.AI_BUY_THRESHOLD);

    return canAfford && isGoodDeal;
}

/**
 * Calcule un délai aléatoire pour simuler la réflexion de l'IA
 */
export function getAIThinkingDelay(): number {
    // Délai entre 1000ms et 2000ms
    return Math.random() * 1000 + 1000;
}

/**
 * Log les décisions de l'IA dans la console (utile pour debug)
 */
export function logAIDecision(action: string, details?: any) {
    console.log(`🤖 IA: ${action}`, details || '');
}
