import { v4 as uuidv4 } from 'uuid';
import { GameState, Player } from '../types';

export class GameManager {
    private games: Map<string, GameState> = new Map();

    createGame(hostName: string, socketId: string): GameState {
        const gameId = uuidv4().substring(0, 6).toUpperCase(); // Short code for easy sharing
        const host: Player = {
            id: uuidv4(),
            name: hostName,
            socketId,
            isReady: false,
            position: 0,
            money: 1500,
            properties: [],
            isInJail: false,
            jailTurns: 0,
            color: '#FF0000' // Default color, to be randomized later
        };

        const newGame: GameState = {
            id: gameId,
            players: [host],
            currentPlayerIndex: 0,
            status: 'WAITING',
            board: [] // TODO: Initialize board
        };

        this.games.set(gameId, newGame);
        return newGame;
    }

    joinGame(gameId: string, playerName: string, socketId: string): GameState | null {
        const game = this.games.get(gameId);
        if (!game) return null;
        if (game.status !== 'WAITING') return null; // Cannot join started game

        const newPlayer: Player = {
            id: uuidv4(),
            name: playerName,
            socketId,
            isReady: false,
            position: 0,
            money: 1500,
            properties: [],
            isInJail: false,
            jailTurns: 0,
            color: '#0000FF' // TODO: Assign unique color
        };

        game.players.push(newPlayer);
        return game;
    }

    getGame(gameId: string): GameState | undefined {
        return this.games.get(gameId);
    }

    removePlayer(socketId: string) {
        // Find game where player is
        for (const [gameId, game] of this.games.entries()) {
            const playerIndex = game.players.findIndex(p => p.socketId === socketId);
            if (playerIndex !== -1) {
                game.players.splice(playerIndex, 1);
                if (game.players.length === 0) {
                    this.games.delete(gameId);
                }
                return gameId;
            }
        }
        return null;
    }
}

export const gameManager = new GameManager();
