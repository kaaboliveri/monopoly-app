import { useGameStore } from '../store/useGameStore';
import styles from './MenuScreen.module.css';

export function MenuScreen() {
    const { setScreen } = useGameStore();

    return (
        <div className={styles.menuContainer}>
            <h1 className={styles.title}>MONOPOLY</h1>
            <h2 className={styles.subtitle}>Édition Stitch</h2>

            <button
                className={styles.startButton}
                onClick={() => setScreen('lobby')}
            >
                NOUVELLE PARTIE
            </button>
        </div>
    );
}
