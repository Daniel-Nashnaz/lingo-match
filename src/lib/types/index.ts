export interface WordPair {
  id?: string;
  wordKnown: string;
  wordLearn: string;
}
export interface GameResult {
  score: number;
  moves: number;
  gameTime: number;
}

export enum WordPairType {
  WORDKNOWN = "wordKnown",
  WORDLEARN = "wordLearn",
}

export interface CardGame {
  id: number;
  identityMatched: string;
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
}
