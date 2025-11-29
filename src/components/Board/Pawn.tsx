import { useMemo } from 'react';
import styles from './Pawn.module.css';

interface PawnProps {
    position: number; // 0-39
    isAI: boolean;
    boardSize: number; // Taille du plateau en px
}

// Calcul des positions des cases du Monopoly (disposition carrée)
function getCellPosition(cellIndex: number, boardSize: number): { x: number; y: number } {
    const cellSize = boardSize / 11; // 11x11 grille (avec coins)

    // Bottom row (cases 0-10): de droite à gauche
    if (cellIndex >= 0 && cellIndex <= 10) {
        return {
            x: boardSize - (cellIndex * cellSize) - cellSize,
            y: boardSize - cellSize
        };
    }

    // Left column (cases 11-19): de bas en haut
    if (cellIndex >= 11 && cellIndex <= 19) {
        const offset = cellIndex - 11;
        return {
            x: 0,
            y: boardSize - cellSize - (offset + 1) * cellSize
        };
    }

    // Top row (cases 20-29): de gauche à droite
    if (cellIndex >= 20 && cellIndex <= 29) {
        const offset = cellIndex - 20;
        return {
            x: (offset + 1) * cellSize,
            y: 0
        };
    }

    // Right column (cases 30-39): de haut en bas
    if (cellIndex >= 30 && cellIndex <= 39) {
        const offset = cellIndex - 30;
        return {
            x: boardSize - cellSize,
            y: (offset + 1) * cellSize
        };
    }

    return { x: 0, y: 0 };
}

export function Pawn({ position, isAI, boardSize }: PawnProps) {
    const { x, y } = useMemo(() => getCellPosition(position, boardSize), [position, boardSize]);

    return (
        <div
            className={`${styles.pawn} ${isAI ? styles.ai : styles.player}`}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
            title={isAI ? 'IA Stitch' : 'Vous'}
        >
            {isAI ? '🤖' : '👤'}
        </div>
    );
}
