import { useGameStore } from '../store/useGameStore';
import { ASSETS } from '../engine/constants';
import styles from './EndScreen.module.css';

export function EndScreen() {
    const { winner, resetGame } = useGameStore();

    return (
        <div
            className={styles.endContainer}
            style={{ backgroundImage: `url(${ASSETS.screens.endGame})` }}
        >
            <div className={styles.endContent}>
                <h1>{winner === 'Vous' ? '🎉 Victoire !' : '😢 Défaite'}</h1>
                <p>{winner} a gagné la partie !</p>
                <button
                    className={styles.replayButton}
                    onClick={resetGame}
                >
                    🔄 Rejouer
                </button>
            </div>
        </div>
    );
}
