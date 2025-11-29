import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { PlayerConfig } from '../types/game.types';
import styles from './LobbyScreen.module.css';

const AVAILABLE_TOKENS = ['🎩', '🚗', '🐕', '🚢', '🦖', '🎸', '🤖', '🐱'];

export function LobbyScreen() {
    const { startGameWithConfig, setScreen } = useGameStore();

    const [players, setPlayers] = useState<PlayerConfig[]>([
        { name: 'Joueur 1', token: '🎩', isAI: false },
        { name: 'Stitch IA', token: '🤖', isAI: true }
    ]);

    const [newName, setNewName] = useState('');
    const [newToken, setNewToken] = useState(AVAILABLE_TOKENS[2]);

    const addPlayer = () => {
        if (newName.trim() && players.length < 6) {
            setPlayers([...players, { name: newName, token: newToken, isAI: false }]);
            setNewName('');
            // Select next available token
            const usedTokens = [...players.map(p => p.token), newToken];
            const nextToken = AVAILABLE_TOKENS.find(t => !usedTokens.includes(t)) || AVAILABLE_TOKENS[0];
            setNewToken(nextToken);
        }
    };

    const removePlayer = (index: number) => {
        if (players.length > 2) {
            const newPlayers = [...players];
            newPlayers.splice(index, 1);
            setPlayers(newPlayers);
        }
    };

    const handleStartGame = () => {
        startGameWithConfig(players);
    };

    return (
        <div className={styles.lobbyContainer}>
            <button className={styles.backButton} onClick={() => setScreen('menu')}>
                ⬅ Retour
            </button>

            <h1 className={styles.title}>Configuration de la Partie</h1>

            <div className={styles.content}>
                <div className={styles.playerList}>
                    {players.map((player, index) => (
                        <div key={index} className={styles.playerItem}>
                            <div className={styles.playerInfo}>
                                <span className={styles.token}>{player.token}</span>
                                <span>{player.name} {player.isAI && '(IA)'}</span>
                            </div>
                            {!player.isAI && players.length > 2 && (
                                <button
                                    className={styles.removeButton}
                                    onClick={() => removePlayer(index)}
                                >
                                    ✖
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {players.length < 6 && (
                    <div className={styles.addPlayerForm}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Nom du joueur"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                        />
                        <select
                            className={styles.tokenSelect}
                            value={newToken}
                            onChange={(e) => setNewToken(e.target.value)}
                        >
                            {AVAILABLE_TOKENS.filter(t => !players.map(p => p.token).includes(t) || t === newToken).map(token => (
                                <option key={token} value={token}>{token}</option>
                            ))}
                        </select>
                        <button className={styles.addButton} onClick={addPlayer}>
                            +
                        </button>
                    </div>
                )}

                <button
                    className={styles.startButton}
                    onClick={handleStartGame}
                    disabled={players.length < 2}
                >
                    Lancer la Partie 🚀
                </button>
            </div>
        </div>
    );
}
