/**
 * Cartes Chance et Caisse de Communauté
 * Basé sur les règles du Monopoly français
 */

export interface Card {
    id: string;
    type: 'chance' | 'community';
    title: string;
    description: string;
    effect: CardEffect;
}

export type CardEffect =
    | { type: 'money'; amount: number } // Gagner/perdre de l'argent
    | { type: 'move'; position: number } // Se déplacer vers une case
    | { type: 'moveRelative'; steps: number } // Reculer de X cases
    | { type: 'jail' } // Aller en prison
    | { type: 'jailFree' } // Carte "Sortez de prison"
    | { type: 'repairs'; perHouse: number; perHotel: number } // Réparations
    | { type: 'payPlayers'; amount: number }; // Payer chaque joueur

/**
 * Cartes Chance (16 cartes)
 */
export const CHANCE_CARDS: Card[] = [
    {
        id: 'chance-1',
        type: 'chance',
        title: 'Avancez jusqu au Départ',
        description: 'Avancez jusqu\'au "DÉPART" (Recevez 200€)',
        effect: { type: 'move', position: 0 },
    },
    {
        id: 'chance-2',
        type: 'chance',
        title: 'Rendez-vous à la Rue de la Paix',
        description: 'Avancez jusqu\'à la Rue de la Paix',
        effect: { type: 'move', position: 39 },
    },
    {
        id: 'chance-3',
        type: 'chance',
        title: 'Rendez-vous à l Avenue Henri-Martin',
        description: 'Si vous passez par la case "DÉPART", recevez 200€',
        effect: { type: 'move', position: 24 },
    },
    {
        id: 'chance-4',
        type: 'chance',
        title: 'Avancez au Boulevard de la Villette',
        description: 'Si vous passez par la case "DÉPART", recevez 200€',
        effect: { type: 'move', position: 11 },
    },
    {
        id: 'chance-5',
        type: 'chance',
        title: 'Rendez-vous à la gare la plus proche',
        description: 'Si vous passez par la case "DÉPART", recevez 200€',
        effect: { type: 'move', position: 5 }, // Simplifié - devrait chercher la gare la plus proche
    },
    {
        id: 'chance-6',
        type: 'chance',
        title: 'Reculez de 3 cases',
        description: 'Reculez de 3 cases',
        effect: { type: 'moveRelative', steps: -3 },
    },
    {
        id: 'chance-7',
        type: 'chance',
        title: 'Allez en prison',
        description: 'Allez en prison directement, ne passez pas par la case "DÉPART", ne recevez pas 200€',
        effect: { type: 'jail' },
    },
    {
        id: 'chance-8',
        type: 'chance',
        title: 'Votre immeuble rapporte',
        description: 'Votre immeuble et vos prêts vous rapportent 150€',
        effect: { type: 'money', amount: 150 },
    },
    {
        id: 'chance-9',
        type: 'chance',
        title: 'Amende pour excès de vitesse',
        description: 'Amende pour excès de vitesse, payez 15€',
        effect: { type: 'money', amount: -15 },
    },
    {
        id: 'chance-10',
        type: 'chance',
        title: 'Amende pour ivresse',
        description: 'Amende pour ivresse, payez 20€',
        effect: { type: 'money', amount: -20 },
    },
    {
        id: 'chance-11',
        type: 'chance',
        title: 'Vous êtes libéré de prison',
        description: 'Vous êtes libéré de prison, cette carte peut être conservée jusqu\'à ce qu\'elle soit utilisée',
        effect: { type: 'jailFree' },
    },
    {
        id: 'chance-12',
        type: 'chance',
        title: 'Faites des réparations',
        description: 'Faites des réparations dans toutes vos maisons : 25€ par maison, 100€ par hôtel',
        effect: { type: 'repairs', perHouse: 25, perHotel: 100 },
    },
    {
        id: 'chance-13',
        type: 'chance',
        title: 'La banque vous verse un dividende',
        description: 'La banque vous verse un dividende de 50€',
        effect: { type: 'money', amount: 50 },
    },
];

/**
 * Cartes Caisse de Communauté (16 cartes)
 */
export const COMMUNITY_CARDS: Card[] = [
    {
        id: 'community-1',
        type: 'community',
        title: 'Avancez jusqu au Départ',
        description: 'Avancez jusqu\'au "DÉPART" (Recevez 200€)',
        effect: { type: 'move', position: 0 },
    },
    {
        id: 'community-2',
        type: 'community',
        title: 'Erreur de la banque en votre faveur',
        description: 'Erreur de la banque en votre faveur, recevez 200€',
        effect: { type: 'money', amount: 200 },
    },
    {
        id: 'community-3',
        type: 'community',
        title: 'Payez la note du médecin',
        description: 'Payez la note du médecin, 50€',
        effect: { type: 'money', amount: -50 },
    },
    {
        id: 'community-4',
        type: 'community',
        title: 'Vous héritez',
        description: 'Vous héritez, recevez 100€',
        effect: { type: 'money', amount: 100 },
    },
    {
        id: 'community-5',
        type: 'community',
        title: 'Vente de votre stock',
        description: 'La vente de votre stock vous rapporte 50€',
        effect: { type: 'money', amount: 50 },
    },
    {
        id: 'community-6',
        type: 'community',
        title: 'C est votre anniversaire',
        description: 'C\'est votre anniversaire, chaque joueur vous donne 10€',
        effect: { type: 'payPlayers', amount: 10 },
    },
    {
        id: 'community-7',
        type: 'community',
        title: 'Vous êtes libéré de prison',
        description: 'Vous êtes libéré de prison, cette carte peut être conservée jusqu\'à ce qu\'elle soit utilisée',
        effect: { type: 'jailFree' },
    },
    {
        id: 'community-8',
        type: 'community',
        title: 'Allez en prison',
        description: 'Allez en prison directement, ne passez pas par la case "DÉPART", ne recevez pas 200€',
        effect: { type: 'jail' },
    },
    {
        id: 'community-9',
        type: 'community',
        title: 'Payez à l hôpital',
        description: 'Payez à l\'hôpital 100€',
        effect: { type: 'money', amount: -100 },
    },
    {
        id: 'community-10',
        type: 'community',
        title: 'Recevez votre revenu annuel',
        description: 'Recevez votre revenu annuel, 100€',
        effect: { type: 'money', amount: 100 },
    },
    {
        id: 'community-11',
        type: 'community',
        title: 'Les contributions vous remboursent',
        description: 'Les contributions vous remboursent la somme de 20€',
        effect: { type: 'money', amount: 20 },
    },
    {
        id: 'community-12',
        type: 'community',
        title: 'Vous avez gagné le deuxième prix',
        description: 'Vous avez gagné le deuxième prix de beauté, recevez 10€',
        effect: { type: 'money', amount: 10 },
    },
    {
        id: 'community-13',
        type: 'community',
        title: 'Payez votre police d assurance',
        description: 'Payez votre police d\'assurance, 50€',
        effect: { type: 'money', amount: -50 },
    },
    {
        id: 'community-14',
        type: 'community',
        title: 'Vous gagnez le concours de mots croisés',
        description: 'Vous gagnez le concours de mots croisés, recevez 100€',
        effect: { type: 'money', amount: 100 },
    },
    {
        id: 'community-15',
        type: 'community',
        title: 'Retournez à Belleville',
        description: 'Retournez à Belleville',
        effect: { type: 'move', position: 1 },
    },
    {
        id: 'community-16',
        type: 'community',
        title: 'Vous devez faire des réparations',
        description: 'Vous devez faire des réparations dans toutes vos maisons, payez 40€ par maison et 115€ par hôtel',
        effect: { type: 'repairs', perHouse: 40, perHotel: 115 },
    },
];

/**
 * Mélanger un deck de cartes
 */
export function shuffleDeck(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Piocher une carte du deck
 */
export function drawCard(deck: Card[]): { card: Card; newDeck: Card[] } {
    if (deck.length === 0) {
        throw new Error('Le deck est vide');
    }

    const [card, ...rest] = deck;
    // Si le deck est vide, le remélanger (sans la carte piochée si c'est "Sortez de prison")
    const newDeck = rest.length === 0 ? shuffleDeck(rest) : rest;

    return { card, newDeck };
}
