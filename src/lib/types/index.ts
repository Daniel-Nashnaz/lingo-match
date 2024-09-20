export interface WordPair {
  id?: string;
  wordKnown: string;
  wordLearn: string;
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
