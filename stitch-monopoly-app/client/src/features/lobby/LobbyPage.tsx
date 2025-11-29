import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const LobbyPage: React.FC = () => {
    const { connect, isConnected, setPlayerName, createGame, joinGame, gameState, playerName } = useGameStore();
    const [gameIdInput, setGameIdInput] = useState('');

    useEffect(() => {
        connect();
    }, [connect]);

    if (gameState) {
        return (
            <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-8">Lobby: {gameState.id}</h1>
                <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md w-full max-w-md">
                    <h2 className="text-2xl mb-4">Joueurs ({gameState.players.length})</h2>
                    <ul className="space-y-2">
                        {gameState.players.map((p) => (
                            <li key={p.id} className="flex items-center justify-between bg-white/5 p-3 rounded">
                                <span>{p.name}</span>
                                {p.isReady ? (
                                    <span className="text-green-400">Prêt</span>
                                ) : (
                                    <span className="text-yellow-400">En attente...</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 text-center text-sm text-gray-400">
                        En attente du lancement de la partie...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Stitch Monopoly</h1>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pseudo</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Entrez votre nom..."
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <button
                        onClick={createGame}
                        disabled={!isConnected || !playerName}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50"
                    >
                        Créer une partie
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400">OU</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-3 border border-gray-300 rounded-lg outline-none"
                            placeholder="Code de la partie"
                            value={gameIdInput}
                            onChange={(e) => setGameIdInput(e.target.value.toUpperCase())}
                        />
                        <button
                            onClick={() => joinGame(gameIdInput)}
                            disabled={!isConnected || !playerName || !gameIdInput}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition disabled:opacity-50"
                        >
                            Rejoindre
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-gray-500">{isConnected ? 'Connecté au serveur' : 'Déconnecté'}</span>
                </div>
            </div>
        </div>
    );
};
