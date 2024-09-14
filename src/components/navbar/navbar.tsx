/*"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card"; // שימוש ב-Card ו-CardContent
import { Shuffle } from 'lucide-react';

const initialCards = [
  { id: 1, word: 'Hello', translation: 'שלום', flipped: false, matched: false },
  { id: 2, word: 'World', translation: 'עולם', flipped: false, matched: false },
  { id: 3, word: 'Good', translation: 'טוב', flipped: false, matched: false },
  { id: 4, word: 'Morning', translation: 'בוקר', flipped: false, matched: false },
  { id: 5, word: 'Night', translation: 'לילה', flipped: false, matched: false },
  { id: 6, word: 'Sun', translation: 'שמש', flipped: false, matched: false },
  { id: 7, word: 'Moon', translation: 'ירח', flipped: false, matched: false },
  { id: 8, word: 'Star', translation: 'כוכב', flipped: false, matched: false },
  { id: 9, word: 'Tree', translation: 'עץ', flipped: false, matched: false },
  { id: 10, word: 'Flower', translation: 'פרח', flipped: false, matched: false },
];

const pageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const Page = () => {
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState(initialCards);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    // בדיקת האם המשחק הושלם
    const allMatched = cards.every(card => card.matched);
    if (allMatched) {
      setGameComplete(true);
    }
  }, [cards]);

  const handleCardClick = (id: number) => {
    setMoves(moves + 1);
    setCards(cards.map(card => 
      card.id === id ? { ...card, flipped: !card.flipped } : card
    ));
  };

  const initializeGame = () => {
    setMoves(0);
    setGameComplete(false);
    setCards(initialCards.map(card => ({ ...card, flipped: false, matched: false })));
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.h1 className="text-3xl font-bold mb-4">
        Word Translation Memory Game
      </motion.h1>

      <motion.div className="mb-4 text-lg">
        Moves: {moves}
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-32 h-32"
          >
            <Card
              className={`w-full h-full cursor-pointer transition-transform duration-300 ${
                card.flipped || card.matched ? 'bg-white' : 'bg-primary'
              } rounded-lg border border-gray-300`}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent className="p-4 h-full flex items-center justify-center">
                {card.flipped || card.matched ? (
                  <div className="text-center">
                    <div className="font-semibold">{card.word}</div>
                    <div className="text-sm text-muted-foreground">{card.translation}</div>
                  </div>
                ) : (
                  <span className="sr-only">Card face down</span>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={initializeGame}
        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Shuffle className="mr-2 h-4 w-4" /> New Game
      </motion.button>

      {gameComplete && (
        <motion.div
          className="mt-4 text-xl font-bold text-green-600"
          role="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Congratulations! You completed the game in {moves} moves!
        </motion.div>
      )}
    </motion.div>
  );
};

export default Page;
*/
'use client'

import { useState, useEffect } from 'react'
import { Shuffle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type CardType = {
  id: number
  content: string
  flipped: boolean
  matched: boolean
}

const allEmojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦗', '🕷', '🦂', '🦟', '🦠', '🐢', '🐍', '🦎', '🦖', '🦕']

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 })
  const [uniqueCardCount, setUniqueCardCount] = useState(6)
  const [inputCardCount, setInputCardCount] = useState('6')

  useEffect(() => {
    initializeGame()
    window.addEventListener('resize', updateGridDimensions);

    // Cleanup function: Remove the event listener when the component is unmounted
    // or when the dependencies of this effect change.
    // This prevents memory leaks and ensures that no unnecessary event listeners
    // remain active after the component is no longer in use.
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, [uniqueCardCount])

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameComplete(true)
    }
  }, [cards])

  const initializeGame = () => {
    const emojis = allEmojis.slice(0, uniqueCardCount)
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      content: emoji,
      flipped: false,
      matched: false
    }))
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setGameComplete(false)
    updateGridDimensions()
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      checkForMatch(newFlippedCards)
    }
  }

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds
    if (cards[firstId].content === cards[secondId].content) {
      const newCards = [...cards]
      newCards[firstId].matched = true
      newCards[secondId].matched = true
      setCards(newCards)
      setFlippedCards([])
    } else {
      setTimeout(() => {
        const newCards = [...cards]
        newCards[firstId].flipped = false
        newCards[secondId].flipped = false
        setCards(newCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  const updateGridDimensions = () => {
      // Get the width of the container element
      const width = window.innerWidth;
      
      // Determine the aspect ratio based on the container's width
      const aspectRatio = width < 640 ? 3 / 4 : width < 1024 ? 4 / 5 : 5 / 6;
      
      // Total number of cards in the grid
      const totalCards = 16; // Example total number of cards
      
      // Calculate the number of columns needed
      let cols = Math.ceil(Math.sqrt(totalCards * aspectRatio));
      // Calculate the number of rows needed
      let rows = Math.ceil(totalCards / cols);
      
      // Adjust columns and rows to ensure the grid fits the total number of cards
      while (rows * cols > totalCards) {
        cols--;
        rows = Math.ceil(totalCards / cols);
      }
  
      // Update the state with the new grid dimensions
      setGridDimensions({ rows, cols });
  };

  const handleCardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCardCount(e.target.value)
  }

  const applyCardCount = () => {
    let newCount = Math.max(1, Math.min(parseInt(inputCardCount) || 1, allEmojis.length))
    setUniqueCardCount(newCount)
    setInputCardCount(newCount.toString())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">משחק הזיכרון</h1>
      <div className="mb-4">מהלכים: {moves}</div>

      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateRows: `repeat(${gridDimensions.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${gridDimensions.cols}, 1fr)`,
          width: '100%',
          maxWidth: '800px',
          aspectRatio: `${gridDimensions.cols} / ${gridDimensions.rows}`
        }}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            className={`aspect-square flex items-center justify-center cursor-pointer transition-all duration-300 ${card.flipped || card.matched ? 'bg-white' : 'bg-blue-500'
              }`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="flex items-center justify-center text-2xl font-bold p-0">
              {card.flipped || card.matched ? card.content : ''}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Input
          type="number"
          value={inputCardCount}
          onChange={handleCardCountChange}
          className="w-20"
          min="1"
          max={allEmojis.length}
        />
        <Button onClick={applyCardCount}>שנה מספר זוגות</Button>
      </div>

      <Button onClick={initializeGame} className="flex items-center">
        <Shuffle className="mr-2 h-4 w-4" /> משחק חדש
      </Button>

      {gameComplete && (
        <div className="mt-4 text-xl font-bold text-green-600">
          כל הכבוד! השלמת את המשחק ב-{moves} מהלכים!
        </div>
      )}
    </div>
  )
}