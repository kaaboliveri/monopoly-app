import { Server, Socket } from 'socket.io';
import { gameManager } from '../services/GameManager';
import { CreateGamePayload, JoinGamePayload } from '../types';

export const setupGameGateway = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('User connected to Gateway:', socket.id);

        // Create Game
        socket.on('CREATE_GAME', (payload: CreateGamePayload) => {
            try {
                const game = gameManager.createGame(payload.hostName, socket.id);
                socket.join(game.id);
                socket.emit('GAME_CREATED', game);
                console.log(`Game created: ${game.id} by ${payload.hostName}`);
            } catch (error) {
                socket.emit('ERROR', { message: 'Failed to create game' });
            }
        });

        // Join Game
        socket.on('JOIN_GAME', (payload: JoinGamePayload) => {
            try {
                const game = gameManager.joinGame(payload.gameId, payload.playerName, socket.id);
                if (game) {
                    socket.join(game.id);
                    // Notify everyone in the room (including sender) with updated state
                    io.to(game.id).emit('GAME_UPDATED', game);
                    console.log(`Player ${payload.playerName} joined game ${payload.gameId}`);
                } else {
                    socket.emit('ERROR', { message: 'Game not found or started' });
                }
            } catch (error) {
                socket.emit('ERROR', { message: 'Failed to join game' });
            }
        });

        // Disconnect
        socket.on('disconnect', () => {
            const gameId = gameManager.removePlayer(socket.id);
            if (gameId) {
                const game = gameManager.getGame(gameId);
                if (game) {
                    io.to(gameId).emit('GAME_UPDATED', game);
                }
                console.log(`User ${socket.id} disconnected from game ${gameId}`);
            }
        });
    });
};
