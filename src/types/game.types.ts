// Types principaux du jeu
export type CellType =
    | 'start'
    | 'property'
    | 'station'
    | 'utility'
    | 'tax'
    | 'chance'
    | 'community'
    | 'jail'
    | 'parking'
    | 'go-to-jail';

export interface BoardCell {
    id: number;
    name: string;
    type: CellType;
    price?: number;
    rent?: number;
    color?: string;
    group?: string;
}

export interface Player {
    id: string;
    name: string;
    token: string;
    money: number;
    position: number;
    properties: number[];
    inJail: boolean;
    jailTurns: number;
    isAI: boolean;
    isBankrupt: boolean;
}

export interface PlayerConfig {
    name: string;
    token: string;
    isAI: boolean;
}

export interface LobbyConfig {
    players: PlayerConfig[];
}

export interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    diceValues: [number, number] | null;
    winner: string | null;
    gameStarted: boolean;
}

export type GameScreen = 'menu' | 'lobby' | 'game' | 'end';
