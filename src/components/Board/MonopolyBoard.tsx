import { BOARD_DATA } from '../../engine/constants';
import {
    CORNER_ICONS,
    SPECIAL_ICONS,
    isCornerCell,
    getCornerClassName
} from '../../utils/boardLayout';
import styles from './MonopolyBoard.module.css';
import { useGameStore } from '../../store/useGameStore';

import { Player } from '../../types/game.types';

interface MonopolyBoardProps {
    children?: React.ReactNode;
    players: Player[];
}

// Fonction pour rendre les formes 3D des pions
const renderPlayer3D = (playerIndex: number) => {
    const shapes = [
        // Joueur 0 - Cylindre rouge
        <svg key="cylinder" width="24" height="32" viewBox="0 0 24 32" className={styles.playerShape}>
            <ellipse cx="12" cy="6" rx="10" ry="4" fill="currentColor" opacity="0.8"/>
            <rect x="2" y="6" width="20" height="20" rx="2" fill="currentColor"/>
            <ellipse cx="12" cy="26" rx="10" ry="4" fill="currentColor" opacity="0.6"/>
        </svg>,

        // Joueur 1 - Cône turquoise
        <svg key="cone" width="24" height="32" viewBox="0 0 24 32" className={styles.playerShape}>
            <polygon points="12,4 22,26 2,26" fill="currentColor"/>
            <circle cx="12" cy="26" r="3" fill="currentColor" opacity="0.7"/>
        </svg>,

        // Joueur 2 - Cube bleu
        <svg key="cube" width="24" height="32" viewBox="0 0 24 32" className={styles.playerShape}>
            <polygon points="8,8 16,4 20,12 12,16" fill="currentColor" opacity="0.9"/>
            <rect x="4" y="12" width="16" height="16" fill="currentColor"/>
            <polygon points="12,16 20,12 20,28 12,32" fill="currentColor" opacity="0.7"/>
        </svg>,

        // Joueur 3 - Sphère orange
        <svg key="sphere" width="24" height="32" viewBox="0 0 24 32" className={styles.playerShape}>
            <ellipse cx="12" cy="8" rx="9" ry="6" fill="currentColor" opacity="0.8"/>
            <ellipse cx="12" cy="12" rx="10" ry="7" fill="currentColor"/>
            <ellipse cx="12" cy="16" rx="9" ry="6" fill="currentColor" opacity="0.9"/>
            <ellipse cx="12" cy="20" rx="8" ry="5" fill="currentColor" opacity="0.8"/>
            <ellipse cx="12" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.6"/>
        </svg>,

        // Joueur 4 - Pyramide violette
        <svg key="pyramid" width="24" height="32" viewBox="0 0 24 32" className={styles.playerShape}>
            <polygon points="12,4 20,16 16,20 8,20 4,16" fill="currentColor" opacity="0.9"/>
            <polygon points="12,4 16,20 12,24 8,20" fill="currentColor"/>
            <polygon points="12,4 8,20 4,16 12,24" fill="currentColor" opacity="0.8"/>
            <polygon points="12,4 20,16 16,20 12,24" fill="currentColor" opacity="0.7"/>
        </svg>,

        // Joueur 5 - Octaèdre vert
        <svg key="octahedron" width="24" height="32" viewBox="0 0 24 32" className={styles.playerShape}>
            <polygon points="12,6 18,12 12,18 6,12" fill="currentColor" opacity="0.9"/>
            <polygon points="12,14 18,20 12,26 6,20" fill="currentColor"/>
            <polygon points="12,6 18,12 18,20 12,14" fill="currentColor" opacity="0.8"/>
            <polygon points="12,6 6,12 6,20 12,14" fill="currentColor" opacity="0.7"/>
            <polygon points="12,18 18,12 18,20 12,26" fill="currentColor" opacity="0.6"/>
            <polygon points="12,18 6,12 6,20 12,26" fill="currentColor" opacity="0.5"/>
        </svg>
    ];

    return shapes[playerIndex] || shapes[0];
};

export function MonopolyBoard({ children, players }: MonopolyBoardProps) {
    const { isMoving, movementPath, currentMovementStep, currentPlayerIndex } = useGameStore();

    /**
     * Calcule la position et le style de la case dans la grille 11x11
     * Chemin standard Monopoly (Départ en bas à droite, sens horaire)
     */
    const getCellStyle = (cellId: number) => {
        let gridColumn = 0;
        let gridRow = 0;
        let className = '';
        let colorBarClass = '';

        if (cellId === 0) { // Départ (Bas Droite)
            gridColumn = 11;
            gridRow = 11;
            className = styles.corner;
        } else if (cellId > 0 && cellId < 10) { // Ligne du bas (Droite -> Gauche)
            gridColumn = 11 - cellId;
            gridRow = 11;
            className = styles.bottom;
            colorBarClass = styles.colorBarBottom;
        } else if (cellId === 10) { // Prison (Bas Gauche)
            gridColumn = 1;
            gridRow = 11;
            className = styles.corner;
        } else if (cellId > 10 && cellId < 20) { // Colonne de gauche (Bas -> Haut)
            gridColumn = 1;
            gridRow = 11 - (cellId - 10);
            className = `${styles.left} ${styles.rotate90}`; // Rotation 90° horaire pour lire depuis la gauche (texte vertical)
            colorBarClass = styles.colorBarLeft;
        } else if (cellId === 20) { // Parc Gratuit (Haut Gauche)
            gridColumn = 1;
            gridRow = 1;
            className = styles.corner;
        } else if (cellId > 20 && cellId < 30) { // Ligne du haut (Gauche -> Droite)
            gridColumn = cellId - 20 + 1;
            gridRow = 1;
            className = styles.top; // Cases du haut orientées normalement (pas de rotation)
            colorBarClass = styles.colorBar;
        } else if (cellId === 30) { // Allez en Prison (Haut Droite)
            gridColumn = 11;
            gridRow = 1;
            className = styles.corner;
        } else if (cellId > 30 && cellId < 40) { // Colonne de droite (Haut -> Bas)
            gridColumn = 11;
            gridRow = cellId - 30 + 1;
            className = `${styles.right} ${styles.rotateMinus90}`; // Rotation -90° (texte vertical)
            colorBarClass = styles.colorBarRight;
        }

        return { gridColumn, gridRow, className, colorBarClass };
    };

    /**
     * Rendu d'une case du plateau
     */
    // Fonction pour déterminer où afficher un pion (avec animation de mouvement)
    const getPlayerDisplayPosition = (player: Player, playerIndex: number) => {
        if (isMoving && playerIndex === currentPlayerIndex && movementPath.length > 0) {
            // Joueur en cours de mouvement
            if (currentMovementStep === 0) {
                // Premier mouvement : partir de la position actuelle
                return player.position;
            } else if (currentMovementStep < movementPath.length) {
                // En cours de mouvement : position intermédiaire
                return movementPath[currentMovementStep - 1];
            } else {
                // Mouvement terminé : position finale
                return movementPath[movementPath.length - 1];
            }
        }
        // Position normale
        return player.position;
    };

    const renderCell = (cellId: number) => {
        const cell = BOARD_DATA[cellId];
        if (!cell) return null;

           const { gridColumn, gridRow, className, colorBarClass } = getCellStyle(cellId);
        const isCorner = isCornerCell(cellId);

        // Filtrer les joueurs sur cette case, en tenant compte du mouvement
        const cellPlayers = players.filter((p, index) => {
            const displayPosition = getPlayerDisplayPosition(p, index);
            return displayPosition === cellId;
        });

        // Style inline pour la position dans la grille
        const gridStyle: React.CSSProperties = {
            gridColumn: `${gridColumn} / span 1`,
            gridRow: `${gridRow} / span 1`,
        };

        // Contenu de la case
        let content;

        if (isCorner) {
            // SVG pour les cases de coin
            const renderCornerIcon = () => {
                if (cellId === 0) { // Case départ
                    return (
                        <svg
                            className={styles.cornerIcon}
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: '#4caf50' }}
                        >
                            {/* Flèche de départ */}
                            <path d="M12 2 L22 12 L18 12 L18 22 L6 22 L6 12 L2 12 Z" fill="currentColor"/>
                            <circle cx="12" cy="12" r="2" fill="white"/>
                        </svg>
                    );
                } else if (cellId === 10) { // Simple visite / Prison
                    return (
                        <svg
                            className={styles.cornerIcon}
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: '#f44336' }}
                        >
                            {/* Barreaux de prison */}
                            <rect x="2" y="6" width="20" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <line x1="6" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="3"/>
                            <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="3"/>
                            <line x1="18" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="3"/>
                            {/* Porte */}
                            <rect x="8" y="10" width="4" height="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    );
                } else if (cellId === 20) { // Parc gratuit
                    return (
                        <svg
                            className={styles.cornerIcon}
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: '#2196f3' }}
                        >
                            {/* Arbre dans un parc */}
                            <rect x="11" y="18" width="2" height="4" fill="currentColor"/>
                            {/* Feuillage */}
                            <circle cx="12" cy="12" r="6" fill="currentColor"/>
                            <circle cx="8" cy="10" r="4" fill="currentColor"/>
                            <circle cx="16" cy="10" r="4" fill="currentColor"/>
                            <circle cx="12" cy="8" r="3" fill="currentColor"/>
                        </svg>
                    );
                } else if (cellId === 30) { // Allez en prison
                    return (
                        <svg
                            className={styles.cornerIcon}
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: '#ff5722' }}
                        >
                            {/* Flèche vers la prison */}
                            <path d="M12 4 L18 10 L15 10 L15 16 L9 16 L9 10 L6 10 Z" fill="currentColor"/>
                            {/* Barreaux stylisés */}
                            <line x1="19" y1="6" x2="19" y2="18" stroke="currentColor" strokeWidth="2"/>
                            <line x1="21" y1="6" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    );
                }
                return null;
            };

            content = (
                <>
                    {renderCornerIcon()}
                    <span className={styles.cornerText}>{cell.name}</span>
                    {cellId === 0 && <span className={styles.price}>RECEVEZ 200€</span>}
                </>
            );
        } else if (cell.type === 'property') {
            // Pour les cases de gauche, on inverse l'ordre pour que la bande colorée soit à droite
            const isLeftCell = className.includes('left');
            const colorBarElement = (
                <div
                    className={colorBarClass}
                    style={{ backgroundColor: cell.color }}
                />
            );
            const contentElement = (
                <div className={styles.propertyContent}>
                    <span className={styles.propertyName}>{cell.name}</span>
                    <span className={styles.price}>{cell.price}€</span>
                </div>
            );

            content = (
                <>
                    {isLeftCell ? (
                        <>
                            {contentElement}
                            {colorBarElement}
                        </>
                    ) : (
                        <>
                            {colorBarElement}
                            {contentElement}
                        </>
                    )}
                </>
            );
        } else {
            // Cases spéciales (Gares, Taxes, Chance, etc.)
            let iconName = 'help';
            let iconColor = 'black';

            if (cell.type === 'station') { iconName = 'station'; iconColor = 'black'; }
            else if (cell.type === 'chance') { iconName = 'chance'; iconColor = '#ff6b35'; }
            else if (cell.type === 'community') { iconName = 'community'; iconColor = '#2e7d32'; }
            else if (cell.type === 'tax') { iconName = cell.name.includes('Luxe') ? 'luxury' : 'income'; iconColor = cell.name.includes('Luxe') ? '#9c27b0' : '#f44336'; }
            else if (cell.type === 'utility') { iconName = cell.name.includes('Eaux') ? 'water' : 'electricity'; iconColor = cell.name.includes('Eaux') ? '#2196f3' : '#ffeb3b'; }

            // SVG pour les différents types de cases
            const renderSpecialIcon = () => {
                if (iconName === 'station') {
                    return (
                        <svg
                            className={styles.icon}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: iconColor }}
                        >
                            {/* Locomotive */}
                            <rect x="2" y="14" width="20" height="6" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                            {/* Roues */}
                            <circle cx="6" cy="20" r="2" fill="currentColor"/>
                            <circle cx="12" cy="20" r="2" fill="currentColor"/>
                            <circle cx="18" cy="20" r="2" fill="currentColor"/>
                            {/* Cheminée */}
                            <rect x="16" y="10" width="3" height="4" fill="currentColor"/>
                            {/* Cabine */}
                            <rect x="4" y="8" width="8" height="6" rx="1" fill="currentColor"/>
                            {/* Fenêtres */}
                            <rect x="6" y="10" width="2" height="2" fill="white"/>
                            <rect x="10" y="10" width="2" height="2" fill="white"/>
                        </svg>
                    );
                } else if (iconName === 'chance') {
                    return (
                        <svg
                            className={styles.icon}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: iconColor }}
                        >
                            {/* Carte Chance */}
                            <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                            {/* Points sur les faces */}
                            <circle cx="9" cy="10" r="1" fill="white"/>
                            <circle cx="15" cy="10" r="1" fill="white"/>
                            <circle cx="12" cy="12" r="1" fill="white"/>
                            <circle cx="9" cy="14" r="1" fill="white"/>
                            <circle cx="15" cy="14" r="1" fill="white"/>
                        </svg>
                    );
                } else if (iconName === 'community') {
                    return (
                        <svg
                            className={styles.icon}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: iconColor }}
                        >
                            {/* Coffre/Caisse de communauté */}
                            <rect x="4" y="12" width="16" height="8" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                            {/* Couvercle */}
                            <path d="M4 12 L12 8 L20 12" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                            {/* Serrure */}
                            <rect x="11" y="15" width="2" height="3" fill="white"/>
                            <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
                        </svg>
                    );
                } else if (iconName === 'luxury') {
                    return (
                        <svg
                            className={styles.icon}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: iconColor }}
                        >
                            {/* Diamant pour taxe de luxe */}
                            <polygon points="12,4 16,12 12,20 8,12" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                            {/* Brillance */}
                            <polygon points="12,6 14,10 12,14 10,10" fill="white" opacity="0.6"/>
                        </svg>
                    );
                } else if (iconName === 'income') {
                    return (
                        <svg
                            className={styles.icon}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: iconColor }}
                        >
                            {/* Document pour impôt sur le revenu */}
                            <rect x="4" y="6" width="16" height="12" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                            {/* Lignes du document */}
                            <line x1="6" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1"/>
                            <line x1="6" y1="13" x2="18" y2="13" stroke="white" strokeWidth="1"/>
                            <line x1="6" y1="16" x2="14" y2="16" stroke="white" strokeWidth="1"/>
                        </svg>
                    );
                } else if (iconName === 'electricity') {
                    return (
                        <svg
                            className={styles.icon}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: iconColor }}
                        >
                            {/* Ampoule/Électricité */}
                            <path d="M12 2 L8 10 L10 10 L9 14 L15 14 L14 10 L16 10 Z" fill="currentColor"/>
                            {/* Filament */}
                            <circle cx="12" cy="16" r="1" fill="currentColor"/>
                            {/* Base */}
                            <rect x="11" y="17" width="2" height="3" fill="currentColor"/>
                            {/* Éclairs autour */}
                            <path d="M6 8 L8 6 L7 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <path d="M18 8 L16 6 L17 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                    );
                } else if (iconName === 'water') {
                    return (
                        <svg
                            className={styles.icon}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: iconColor }}
                        >
                            {/* Goutte d'eau */}
                            <path d="M12 4 C12 4 8 8 8 12 C8 15 10 17 12 19 C14 17 16 15 16 12 C16 8 12 4 12 4 Z" fill="currentColor"/>
                            {/* Vagues stylisées */}
                            <path d="M6 14 Q8 16 10 14 Q12 12 14 14 Q16 16 18 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <path d="M7 17 Q9 19 11 17 Q13 15 15 17 Q17 19 19 17" stroke="currentColor" strokeWidth="1" fill="none"/>
                        </svg>
                    );
                }
                return null;
            };

            content = (
                <div className={styles.propertyContent}>
                    {renderSpecialIcon()}
                    <span className={styles.propertyName}>{cell.name}</span>
                    {cell.price && <span className={styles.price}>{cell.type === 'tax' ? `PAYEZ ${cell.price}€` : `${cell.price}€`}</span>}
                </div>
            );
        }

        return (
            <div
                key={cellId}
                className={`${styles.cell} ${className}`}
                style={gridStyle}
                data-cell-id={cellId}
            >
                {content}
                {/* Affichage des pions */}
                {cellPlayers.length > 0 && (
                    <div className={styles.playerTokenContainer}>
                        {cellPlayers.map((player) => {
                            const playerIndex = players.findIndex(p => p.id === player.id);
                            const isMovingPlayer = isMoving && playerIndex === currentPlayerIndex;

                            return (
                                <div
                                    key={player.id}
                                    className={`${styles.playerToken3D} ${styles[`player${playerIndex}`]} ${isMovingPlayer ? styles.moving : ''}`}
                                    title={player.name}
                                >
                                    {renderPlayer3D(playerIndex)}
                                    <div className={styles.playerTokenText}>
                                        {player.token}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.boardWrapper}>
            <div className={styles.board}>
                {/* Rendu de toutes les cases */}
                {BOARD_DATA.map(cell => renderCell(cell.id))}

                {/* Centre - Logo Monopoly */}
                <div className={styles.center}>
                    <span className={styles.logo}>MONOPOLY</span>
                </div>

                {/* Overlay optionnel */}
                {children}
            </div>
        </div>
    );
}
