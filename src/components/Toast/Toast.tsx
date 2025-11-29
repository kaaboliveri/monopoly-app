import { useEffect } from 'react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    onClose: () => void;
}

const ICONS = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
};

export function Toast({ type, title, message, duration = 3000, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.toastIcon}>
                {ICONS[type]}
            </div>
            <div className={styles.toastContent}>
                <p className={styles.toastTitle}>{title}</p>
                {message && <p className={styles.toastMessage}>{message}</p>}
            </div>
        </div>
    );
}
