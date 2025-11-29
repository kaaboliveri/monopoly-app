/**
 * Utilitaires pour la disposition du plateau de Monopoly
 * Gère l'ordre et l'orientation des 40 cases
 */

export interface BoardLayoutSection {
    cellIds: number[];
    orientation: 'horizontal' | 'vertical';
    reverseOrder?: boolean;
}

/**
 * Définit les 4 sections du plateau dans l'ordre visuel (sens horaire depuis Départ)
 */
export const BOARD_LAYOUT: Record<string, BoardLayoutSection> = {
    bottom: {
        cellIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        orientation: 'horizontal',
        reverseOrder: false,
    },
    left: {
        cellIds: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        orientation: 'vertical',
        reverseOrder: false,
    },
    top: {
        cellIds: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        orientation: 'horizontal',
        reverseOrder: true,
    },
    right: {
        cellIds: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        orientation: 'vertical',
        reverseOrder: true,
    },
};

/**
 * Icônes pour les coins du plateau (Material Symbols)
 */
export const CORNER_ICONS: Record<number, string> = {
    0: 'arrow_right_alt',    // Départ
    10: 'gavel',             // En Prison / Simple Visite
    20: 'local_parking',     // Parc Gratuit
    30: 'directions_run',    // Allez en Prison
};

/**
 * Icônes pour les cases spéciales (Material Symbols)
 */
export const SPECIAL_ICONS: Record<string, string> = {
    chance: 'redeem',
    community: 'help',
    station: 'train',
    utility: 'lightbulb',
    tax: 'receipt_long',
    'go-to-jail': 'directions_run',
    parking: 'local_parking',
    jail: 'gavel',
};

/**
 * Détermine si une case est un coin du plateau
 */
export function isCornerCell(cellId: number): boolean {
    return [0, 10, 20, 30].includes(cellId);
}

/**
 * Retourne le nom de la classe CSS pour un coin donné
 */
export function getCornerClassName(cellId: number): string {
    const cornerNames: Record<number, string> = {
        0: 'bottomLeft',
        10: 'topLeft',
        20: 'topRight',
        30: 'bottomRight',
    };
    return cornerNames[cellId] || '';
}
