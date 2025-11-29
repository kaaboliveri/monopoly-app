import { useGameStore } from '../../store/useGameStore';
import { BOARD_DATA } from '../../engine/constants';
import styles from './TaxModal.module.css';

export function TaxModal() {
    const {
        showTaxModal,
        currentCellId,
        payTax
    } = useGameStore();

    if (!showTaxModal || currentCellId === null) return null;

    const cell = BOARD_DATA[currentCellId];
    if (!cell || cell.type !== 'tax' || !cell.price) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <span className={styles.icon}>💰</span>
                <h2 className={styles.title}>{cell.name}</h2>
                <div className={styles.amount}>{cell.price}€</div>
                <p className={styles.description}>
                    Vous devez payer cette taxe à la banque.
                </p>
                <button
                    className={styles.button}
                    onClick={() => payTax(cell.price!)}
                >
                    PAYER
                </button>
            </div>
        </div>
    );
}
