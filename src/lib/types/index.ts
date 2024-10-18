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

export interface GameSettings {
  disqualificationMode: boolean;
  timedMode: boolean;
  showCardsMode: boolean;
}

export interface SettingInfo {
  id: string;
  title: string;
  description: string;
  details: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  emoji: string;
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
