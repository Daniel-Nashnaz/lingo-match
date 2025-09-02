import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { WordService } from '@/services/wordService';
import { Difficulty, LanguageCodes } from '@/lib/types/enums';
import { seedDatabase } from '@/scripts/seed_database';

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const wordService = new WordService();
  console.log('HERE');

  try {
    // await seedDatabase();
    //TODO find translate for word!!!!
    // const wordsWithTranslations = await wordService.getWordsWithTranslations(
    //   'animals', // ערך ברירת מחדל אם לא נמסר
    //   25, // ברירת מחדל של 10
    //   Difficulty.Hard, // ברירת מחדל
    //   LanguageCodes.Hebrew // ברירת מחדל
    // );

    return NextResponse.json({ message: 'wordsWithTranslations' });
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json({ message: `Error in API: ${error}` }, { status: 500 });
  }
}
