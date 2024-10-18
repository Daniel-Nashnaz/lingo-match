import { CardGame, WordPair } from "@/lib/types";
import {
  EXTRA_TIME_OF_ADD_FIVE_PAIRS,
  LIFE_MULTIPLIER,
  NUM_OF_PAIRS_REQUIRED,
  TIME_OF_FIVE_PAIRS,
} from "@/lib/utils/constants";
import { v4 as uuidv4 } from "uuid";

export const generateCardPairs = (words: WordPair[]): CardGame[] => {
  const cardPairs: CardGame[] = words.flatMap((word, index) => {
    const uniqueId = uuidv4();
    return [
      {
        word: word.wordKnown,
        id: index * 2,
        isFlipped: false,
        isMatched: false,
        identityMatched: uniqueId,
      },
      {
        word: word.wordLearn,
        id: index * 2 + 1,
        isFlipped: false,
        isMatched: false,
        identityMatched: uniqueId,
      },
    ];
  });
  return shuffleArray(cardPairs);
};

export const shuffleArray = (array: CardGame[]) => {
  return array.sort(() => Math.random() - 0.5);
};

/**
 * Calculates the number of lives a player should have based on the word pairs.
 *
 * @param wordPairs - The array of word pairs in the game.
 * @returns The calculated number of lives, rounded up to the nearest whole number.
 */
export const calculateGameLives = (wordPairs: WordPair[]): number => {
  const pairs = wordPairs.length;
  return Math.ceil(pairs * LIFE_MULTIPLIER);
};

export const calculateGameTimes = (wordPairs: WordPair[]): number => {
  const numPairs = wordPairs.length;
  let timeLeft = TIME_OF_FIVE_PAIRS;
  if (numPairs > NUM_OF_PAIRS_REQUIRED)
    // Add extra seconds for every additional 5 pairs
    timeLeft += Math.floor((numPairs - 5) / 5) * EXTRA_TIME_OF_ADD_FIVE_PAIRS;

  return timeLeft;
};
