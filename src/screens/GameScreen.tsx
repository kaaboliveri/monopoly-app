import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { BOARD_DATA } from '../engine/constants';

import { MonopolyBoard } from '../components/Board/MonopolyBoard';
import { Dice } from '../components/Dice/Dice';
import { Modal } from '../components/Modal/Modal';
import { CardModal } from '../components/Modal/CardModal';
import { TaxModal } from '../components/Modal/TaxModal';
import { useAIPlayer } from '../engine/useAIPlayer';
import styles from './GameScreen.module.css';
import modalStyles from '../components/Modal/Modal.module.css';

export function GameScreen() {
    const {
        players,
        currentPlayerIndex,
        rollDice,
        endTurn,
        diceValues,
        showPurchaseModal,
        currentCellId,
        buyProperty,
        skipProperty
    } = useGameStore();

    // Hook pour gérer l'IA automatiquement
    const { isAITurn, isAIThinking } = useAIPlayer();

    // État pour l'animation des dés
    const [isDiceRolling, setIsDiceRolling] = useState(false);
    const [dice1Rolling, setDice1Rolling] = useState(false);
    const [dice2Rolling, setDice2Rolling] = useState(false);

    // Fonction pour lancer les dés avec animation 3D réaliste
    const handleRollDice = () => {
        setIsDiceRolling(true);
        setDice1Rolling(true);

        // Délai pour le deuxième dé (effet de lancer successif)
        setTimeout(() => {
            setDice2Rolling(true);
        }, 150);

        // Arrêt du premier dé (atterrissage)
        setTimeout(() => {
            setDice1Rolling(false);
        }, 800);

        // Arrêt du deuxième dé (atterrissage décalé)
        setTimeout(() => {
            setDice2Rolling(false);
        }, 950);

        // Fin de l'animation globale
        setTimeout(() => {
            setIsDiceRolling(false);
        }, 1700);

        // Appel de la fonction rollDice du store
        rollDice();
    };

    const currentPlayer = players[currentPlayerIndex];
    const otherPlayer = players.find((_, i) => i !== currentPlayerIndex);

    // Afficher le nom de la case actuelle
    const currentCell = BOARD_DATA[currentPlayer?.position || 0];
    const purchaseCell = currentCellId !== null ? BOARD_DATA[currentCellId] : null;

    return (
        <div className={styles.gameContainer}>
            {/* Indicateur tour IA */}
            {isAITurn && isAIThinking && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '2rem 3rem',
                    borderRadius: '20px',
                    fontSize: '1.5rem',
                    zIndex: 999,
                }}>
                    🤖 L'IA réfléchit...
                </div>
            )}

            {/* Zone de jeu principale */}
            <div className={styles.gameArea}>
                {/* Joueur actuel (gauche) */}
                <div className={styles.leftPlayer}>
                    <div className={styles.playerInfo} style={{ opacity: currentPlayer?.isBankrupt ? 0.5 : 1 }}>
                        <h3>👤 {currentPlayer?.name || 'Joueur'} {currentPlayer?.isBankrupt && '(FAILLITE)'}</h3>
                        <p>💰 Argent: {currentPlayer?.money || 0}€</p>
                        <p>📍 Position: {currentCell?.name || 'Départ'}</p>
                        <p>🏠 Propriétés: {currentPlayer?.properties.length || 0}</p>
                    </div>
                </div>

                {/* Plateau de jeu (centre) */}
                <div className={styles.boardSection}>
                    <MonopolyBoard players={players} />
                </div>

                {/* IA (droite) */}
                <div className={styles.rightPlayer}>
                    <div className={styles.playerInfo} style={{ opacity: otherPlayer?.isBankrupt ? 0.5 : 1 }}>
                        <h3>🤖 {otherPlayer?.name || 'IA'} {otherPlayer?.isBankrupt && '(FAILLITE)'}</h3>
                        <p>💰 Argent: {otherPlayer?.money || 0}€</p>
                        <p>📍 Position: {BOARD_DATA[otherPlayer?.position || 0]?.name || 'Départ'}</p>
                        <p>🏠 Propriétés: {otherPlayer?.properties.length || 0}</p>
                    </div>
                </div>
            </div>

            {/* Contrôles */}
            <div className={styles.controls}>
                {diceValues && (
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '0.75rem', padding: '0.25rem' }}>
                        <Dice value={diceValues[0]} isRolling={dice1Rolling} />
                        <Dice value={diceValues[1]} isRolling={dice2Rolling} />
                    </div>
                )}

                               <button
                                   className={styles.button}
                                   onClick={handleRollDice}
                                   disabled={diceValues !== null || isAITurn}
                               >
                                   🎲 Lancer les dés
                               </button>

                <button
                    className={styles.button}
                    onClick={endTurn}
                    disabled={diceValues === null || isAITurn}
                >
                    ✅ Fin de tour
                </button>
            </div>

            {/* Modale d'achat de propriété (cachée si IA) */}
            {!isAITurn && (
                <Modal
                    isOpen={showPurchaseModal}
                    onClose={skipProperty}
                    title="🏠 Achat de propriété"
                    actions={
                        <>
                            <button
                                className={modalStyles.buttonSecondary}
                                onClick={skipProperty}
                            >
                                Ignorer
                            </button>
                            <button
                                className={modalStyles.buttonPrimary}
                                onClick={() => currentCellId !== null && buyProperty(currentCellId)}
                                disabled={!purchaseCell?.price || currentPlayer.money < purchaseCell.price}
                            >
                                Acheter {purchaseCell?.price}€
                            </button>
                        </>
                    }
                >
                    {purchaseCell && (
                        <div>
                            <h3 style={{ color: purchaseCell.color, marginBottom: '1rem' }}>
                                {purchaseCell.name}
                            </h3>
                            <p><strong>Prix :</strong> {purchaseCell.price}€</p>
                            <p><strong>Loyer :</strong> {purchaseCell.rent}€</p>
                            <p style={{ marginTop: '1rem', color: '#666' }}>
                                Votre argent : {currentPlayer.money}€
                            </p>
                        </div>
                    )}
                </Modal>
            )}

            {/* Modales spéciales */}
            <CardModal />
            <TaxModal />
        </div>
    );
}
