export interface Word {
  word: string;
  score: number;
  tags?: string[];
}
export interface WordWithTranslation {
  original: string;
  translated: string;
}
// types/game.ts
export interface GameConfig {
  category: string;
  wordCount: number;
  minScore?: number; // מינימום ציון רלוונטיות
  includeTranslations?: boolean;
}

export interface GameWord {
  original: string;
  translated?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
}

const WORD_COUNT_OPTIONS = [5, 10, 15, 20];
