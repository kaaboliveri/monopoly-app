import { useState, useEffect } from 'react';
import styles from './Dice.module.css';

interface DiceProps {
    value: number; // 1-6
    isRolling?: boolean;
}

export function Dice({ value, isRolling = false }: DiceProps) {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (isRolling) {
            // Animation de changement très rapide pendant le lancer
            const interval = setInterval(() => {
                setDisplayValue(Math.floor(Math.random() * 6) + 1);
            }, 40); // Encore plus rapide pour l'effet 3D

            setTimeout(() => {
                clearInterval(interval);
                setDisplayValue(value);
            }, 1500); // Durée prolongée pour l'animation 3D

            return () => clearInterval(interval);
        } else {
            setDisplayValue(value);
        }
    }, [value, isRolling]);

    // Fonction pour rendre les points sur une face
    const renderDots = (count: number) => {
        const positions = {
            1: [{ top: '50%', left: '50%' }],
            2: [
                { top: '25%', left: '25%' },
                { top: '75%', left: '75%' }
            ],
            3: [
                { top: '25%', left: '25%' },
                { top: '50%', left: '50%' },
                { top: '75%', left: '75%' }
            ],
            4: [
                { top: '25%', left: '25%' },
                { top: '25%', left: '75%' },
                { top: '75%', left: '25%' },
                { top: '75%', left: '75%' }
            ],
            5: [
                { top: '25%', left: '25%' },
                { top: '25%', left: '75%' },
                { top: '50%', left: '50%' },
                { top: '75%', left: '25%' },
                { top: '75%', left: '75%' }
            ],
            6: [
                { top: '25%', left: '25%' },
                { top: '25%', left: '75%' },
                { top: '50%', left: '25%' },
                { top: '50%', left: '75%' },
                { top: '75%', left: '25%' },
                { top: '75%', left: '75%' }
            ]
        };

        return positions[count as keyof typeof positions]?.map((pos, index) => (
            <div
                key={index}
                className={styles.dot}
                style={{ top: pos.top, left: pos.left }}
            />
        ));
    };

    return (
        <div className={`${styles.dice3D} ${isRolling ? styles.rolling : ''}`}>
            <div className={styles.cube}>
                {/* Face avant */}
                <div className={`${styles.face} ${styles.front}`}>
                    {renderDots(displayValue)}
                </div>
                {/* Face arrière */}
                <div className={`${styles.face} ${styles.back}`}>
                    {renderDots(displayValue === 1 ? 6 : displayValue === 2 ? 5 : displayValue === 3 ? 4 : displayValue === 4 ? 3 : displayValue === 5 ? 2 : 1)}
                </div>
                {/* Face droite */}
                <div className={`${styles.face} ${styles.right}`}>
                    {renderDots(displayValue === 1 ? 3 : displayValue === 2 ? 6 : displayValue === 3 ? 2 : displayValue === 4 ? 1 : displayValue === 5 ? 4 : 5)}
                </div>
                {/* Face gauche */}
                <div className={`${styles.face} ${styles.left}`}>
                    {renderDots(displayValue === 1 ? 4 : displayValue === 2 ? 3 : displayValue === 3 ? 5 : displayValue === 4 ? 6 : displayValue === 5 ? 2 : 1)}
                </div>
                {/* Face haut */}
                <div className={`${styles.face} ${styles.top}`}>
                    {renderDots(displayValue === 1 ? 2 : displayValue === 2 ? 1 : displayValue === 3 ? 6 : displayValue === 4 ? 5 : displayValue === 5 ? 3 : 4)}
                </div>
                {/* Face bas */}
                <div className={`${styles.face} ${styles.bottom}`}>
                    {renderDots(displayValue === 1 ? 5 : displayValue === 2 ? 4 : displayValue === 3 ? 1 : displayValue === 4 ? 2 : displayValue === 5 ? 6 : 3)}
                </div>
            </div>
        </div>
    );
}
