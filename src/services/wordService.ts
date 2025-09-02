import { Difficulty, LanguageCodes } from '@/lib/types/enums';
import { DATAMUSE_API_URL, MYMEMORY_API_URL } from '@/lib/utils/constants';
import axios from 'axios';
import { Word, WordWithTranslation } from './interfases/wordInerfaces';
import { translate } from '@vitalets/google-translate-api';

export class WordService {
  private readonly baseUrlDatamuse: string;
  private readonly baseUrlMymemory: string;

  constructor() {
    this.baseUrlDatamuse = DATAMUSE_API_URL;
    this.baseUrlMymemory = MYMEMORY_API_URL;
  }

  async getWordsByCategory(
    category: string,
    limitWord: number = 10,
    difficulty: Difficulty = Difficulty.Medium
  ): Promise<Word[]> {
    try {
      const [specificWords, categoryWords] = await Promise.all([
        this.fetchWords(`rel_trg=${category}`, limitWord * 2),
        this.fetchWords(`ml=${category}`, limitWord * 2),
      ]);
      let combinedWords = [...specificWords, ...categoryWords]
        .filter((words) => {
          return !words.word.includes(' ') && !/[^a-z]/.test(words.word);
        })
        .filter((words, index, self) => index === self.findIndex((a) => a.word === words.word));

      if (difficulty) {
        combinedWords = this.filterByDifficulty(combinedWords, difficulty);
      }

      return combinedWords.sort((a, b) => b.score - a.score).slice(0, limitWord);
    } catch (error) {
      console.error('Error fetching words:', error);
      throw error;
    }
  }

  private getWordDifficulty(word: string): Difficulty {
    const length = word.length;
    if (length <= 4) return Difficulty.Easy;
    if (length <= 6) return Difficulty.Medium;
    return Difficulty.Hard;
  }

  private filterByDifficulty(words: Word[], difficulty: Difficulty): Word[] {
    return words.filter((words) => {
      const wordDifficulty = this.getWordDifficulty(words.word);
      return wordDifficulty === difficulty;
    });
  }

  async getTranslation(word: string, targetLanguage: LanguageCodes): Promise<string> {
    try {
      const { text: translatedText } = await translate(word, { to: targetLanguage });
      return translatedText;
    } catch (error) {
      console.error('Error translating word:', error);
      return `Translation error: ${error}`;
    }
  }

  async getWordsWithTranslations(
    category: string,
    limitWord: number = 20,
    difficulty: Difficulty,
    targetLanguage: LanguageCodes
  ): Promise<WordWithTranslation[]> {
    const words = await this.getWordsByCategory(category, limitWord, difficulty);
    console.log(words);

    const wordsWithTranslations = await Promise.all(
      words.map(async (word) => {
        const translation = await this.getTranslation(word.word, targetLanguage);
        return {
          original: word.word,
          translated: translation,
        };
      })
    );
    return wordsWithTranslations;
  }

  private async fetchWords(query: string, limit: number): Promise<Word[]> {
    try {
      const response = await axios.get(`${this.baseUrlDatamuse}?${query}&max=${limit}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch words');
      }

      return response.data.map((word: Word) => ({
        word: word.word,
        score: word.score,
        tags: word.tags || [],
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching words:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error fetching words:', error);
      }
      throw error;
    }
  }
}
