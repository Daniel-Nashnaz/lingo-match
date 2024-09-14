export interface Card {
    id?: string;
    wordKnown: string;
    wordNew: string;
}

export interface CardGame {
    id: number;
    identityMatched: string;
    word: string;
    isFlipped: boolean;
    isMatched: boolean;
}

