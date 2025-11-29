export interface Player {
    id: string;
    name: string;
    socketId: string;
    isReady: boolean;
    position: number;
    money: number;
    properties: string[]; // Property IDs
    isInJail: boolean;
    jailTurns: number;
    color: string; // Hex color for UI
}

export interface GameState {
    id: string;
    players: Player[];
    currentPlayerIndex: number;
    status: 'WAITING' | 'PLAYING' | 'FINISHED';
    board: any[]; // To be defined with proper Board types
    auction?: {
        propertyId: string;
        currentBid: number;
        highestBidderId: string | null;
        participants: string[]; // Player IDs
    };
}

export interface CreateGamePayload {
    hostName: string;
}

export interface JoinGamePayload {
    gameId: string;
    playerName: string;
}
