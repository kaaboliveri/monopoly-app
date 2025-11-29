import { BoardCell } from '../types/game.types';

// Plateau de jeu complet (40 cases)
export const BOARD_DATA: BoardCell[] = [
    { id: 0, name: 'Départ', type: 'start' },
    { id: 1, name: 'Blvd Belleville', type: 'property', price: 60, rent: 2, color: '#955436', group: 'marron' },
    { id: 2, name: 'Caisse de Communauté', type: 'community' },
    { id: 3, name: 'Rue Lecourbe', type: 'property', price: 60, rent: 4, color: '#955436', group: 'marron' },
    { id: 4, name: 'Impôt sur le Revenu', type: 'tax', price: 200 },
    { id: 5, name: 'Gare Montparnasse', type: 'station', price: 200, color: '#000' },
    { id: 6, name: 'Rue de Vaugirard', type: 'property', price: 100, rent: 6, color: '#aae0fa', group: 'bleu-clair' },
    { id: 7, name: 'Chance', type: 'chance' },
    { id: 8, name: 'Rue de Courcelles', type: 'property', price: 100, rent: 6, color: '#aae0fa', group: 'bleu-clair' },
    { id: 9, name: 'Av. République', type: 'property', price: 120, rent: 8, color: '#aae0fa', group: 'bleu-clair' },

    { id: 10, name: 'Simple Visite / Prison', type: 'jail' },
    { id: 11, name: 'Blvd Villette', type: 'property', price: 140, rent: 10, color: '#d93a96', group: 'rose' },
    { id: 12, name: 'Compagnie d\'Électricité', type: 'utility', price: 150, color: '#FFD700' },
    { id: 13, name: 'Avenue de Neuilly', type: 'property', price: 140, rent: 10, color: '#d93a96', group: 'rose' },
    { id: 14, name: 'Rue de Paradis', type: 'property', price: 160, rent: 12, color: '#d93a96', group: 'rose' },
    { id: 15, name: 'Gare de Lyon', type: 'station', price: 200, color: '#000' },
    { id: 16, name: 'Av. Mozart', type: 'property', price: 180, rent: 14, color: '#f7941d', group: 'orange' },
    { id: 17, name: 'Caisse de Communauté', type: 'community' },
    { id: 18, name: 'Blvd St-Michel', type: 'property', price: 180, rent: 14, color: '#f7941d', group: 'orange' },
    { id: 19, name: 'Place Pigalle', type: 'property', price: 200, rent: 16, color: '#f7941d', group: 'orange' },

    { id: 20, name: 'Parc Gratuit', type: 'parking' },
    { id: 21, name: 'Av. Matignon', type: 'property', price: 220, rent: 18, color: '#ed1b24', group: 'rouge' },
    { id: 22, name: 'Chance', type: 'chance' },
    { id: 23, name: 'Blvd Malesherbes', type: 'property', price: 220, rent: 18, color: '#ed1b24', group: 'rouge' },
    { id: 24, name: 'Av. Henri-Martin', type: 'property', price: 240, rent: 20, color: '#ed1b24', group: 'rouge' },
    { id: 25, name: 'Gare du Nord', type: 'station', price: 200, color: '#000' },
    { id: 26, name: 'Fbg St-Honoré', type: 'property', price: 260, rent: 22, color: '#fef200', group: 'jaune' },
    { id: 27, name: 'Place de la Bourse', type: 'property', price: 260, rent: 22, color: '#fef200', group: 'jaune' },
    { id: 28, name: 'Compagnie des Eaux', type: 'utility', price: 150, color: '#FFD700' },
    { id: 29, name: 'Rue La Fayette', type: 'property', price: 280, rent: 24, color: '#fef200', group: 'jaune' },

    { id: 30, name: 'Allez en Prison', type: 'go-to-jail' },
    { id: 31, name: 'Av. Breteuil', type: 'property', price: 300, rent: 26, color: '#1fb25a', group: 'vert' },
    { id: 32, name: 'Av. Foch', type: 'property', price: 300, rent: 26, color: '#1fb25a', group: 'vert' },
    { id: 33, name: 'Caisse de Communauté', type: 'community' },
    { id: 34, name: 'Blvd Capucines', type: 'property', price: 320, rent: 28, color: '#1fb25a', group: 'vert' },
    { id: 35, name: 'Gare Saint-Lazare', type: 'station', price: 200, color: '#000' },
    { id: 36, name: 'Chance', type: 'chance' },
    { id: 37, name: 'Av. Champs-Élysées', type: 'property', price: 350, rent: 35, color: '#0072bb', group: 'bleu-fonce' },
    { id: 38, name: 'Taxe de Luxe', type: 'tax', price: 100 },
    { id: 39, name: 'Rue Paix', type: 'property', price: 400, rent: 50, color: '#0072bb', group: 'bleu-fonce' },
];

// Configuration du jeu
export const GAME_CONFIG = {
    STARTING_MONEY: 1500,
    GO_BONUS: 200,
    AI_BUY_THRESHOLD: 0.4, // IA achète si prix < 40% de son argent
    AI_TURN_DELAY_MS: 1500, // Délai entre actions IA
};

// Chemins des assets
export const ASSETS = {
    screens: {
        menu: '/assets/menu_principal/screen.png',
        board: '/assets/plateau_de_jeu/screen.png',
        endGame: '/assets/fin_de_partie_/_classement/screen.png',
    },
    modals: {
        purchase: '/assets/achats_et_enchères_(modale)_/screen.png',
        properties: '/assets/gestion_des_propriétés/screen.png',
        prison: '/assets/modale_prison/screen.png',
        chance: '/assets/modale_carte_chance/screen.png',
        community: '/assets/modale_caisse_de_communauté/screen.png',
        goToJail: '/assets/modale_allez_en_prison/screen.png',
        tax: '/assets/modale_impôt_sur_le_revenu/screen.png',
        depart: '/assets/modale_case_départ/screen.png',
    },
};
