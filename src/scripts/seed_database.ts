import prisma from '@/lib/db/prisma';
import fs from 'fs';

interface Word {
  original: string;
  difficulty: number;
}

interface Category {
  name: string;
  description: string;
  level: string;
  words: Word[];
}

interface Database {
  categories: Category[];
}

export async function seedDatabase() {
  try {
    const data = fs.readFileSync('D:\\Users\\Daniel\\Desktop\\real_words_categories2.json', 'utf8');

    const database: Database = JSON.parse(data);

    for (const category of database.categories) {
      const createdCategory = await prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
          level: category.level,
          word_count: category.words.length,
        },
      });

      for (const word of category.words) {
        await prisma.word.create({
          data: {
            original: word.original,
            difficulty: word.difficulty,
            is_cached: false,
            category_id: createdCategory.id,
          },
        });
      }

      console.log(`Added category: ${category.name} with ${category.words.length} words`);
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
