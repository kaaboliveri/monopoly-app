import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

// Define types locally for now (should be shared)
export interface Player {
    id: string;
    name: string;
    isReady: boolean;
    position: number;
    money: number;
    color: string;
}

export interface GameState {
    id: string;
    players: Player[];
    status: 'WAITING' | 'PLAYING' | 'FINISHED';
}

interface GameStore {
    socket: Socket | null;
    isConnected: boolean;
    gameState: GameState | null;
    playerName: string;

    // Actions
    connect: () => void;
    setPlayerName: (name: string) => void;
    createGame: () => void;
    joinGame: (gameId: string) => void;
}

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useGameStore = create<GameStore>((set, get) => ({
    socket: null,
    isConnected: false,
    gameState: null,
    playerName: '',

    connect: () => {
        if (get().socket) return;

        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            set({ isConnected: true });
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            set({ isConnected: false });
            console.log('Disconnected from server');
        });

        socket.on('GAME_CREATED', (game: GameState) => {
            set({ gameState: game });
        });

        socket.on('GAME_UPDATED', (game: GameState) => {
            set({ gameState: game });
        });

        socket.on('ERROR', (err: { message: string }) => {
            console.error('Game Error:', err.message);
            alert(err.message); // Simple feedback for now
        });

        set({ socket });
    },

    setPlayerName: (name: string) => set({ playerName: name }),

    createGame: () => {
        const { socket, playerName } = get();
        if (!socket || !playerName) return;
        socket.emit('CREATE_GAME', { hostName: playerName });
    },

    joinGame: (gameId: string) => {
        const { socket, playerName } = get();
        if (!socket || !playerName) return;
        socket.emit('JOIN_GAME', { gameId, playerName });
    }
}));
