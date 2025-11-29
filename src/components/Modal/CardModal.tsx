import { useGameStore } from '../../store/useGameStore';
import styles from './CardModal.module.css';

export function CardModal() {
    const {
        showCardModal,
        currentCard,
        applyCardEffect
    } = useGameStore();

    if (!showCardModal || !currentCard) return null;

    const isChance = currentCard.type === 'chance';
    const themeClass = isChance ? styles.chance : styles.community;
    const icon = isChance ? '🎁' : '💰';
    const title = isChance ? 'CHANCE' : 'CAISSE DE COMMUNAUTÉ';

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${themeClass}`}>
                <span className={styles.icon}>{icon}</span>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{currentCard.description}</p>
                <button
                    className={styles.button}
                    onClick={applyCardEffect}
                >
                    OK
                </button>
            </div>
        </div>
    );
}
