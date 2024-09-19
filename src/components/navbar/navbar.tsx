"use client";

import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CardType = {
  id: number;
  content: string;
  flipped: boolean;
  matched: boolean;
};

const allEmojis = [
  "dsdsds",
  "fdfdfdfd",
  "moufse",
  "rabfdfbit",
  "fifdfsh",
  "befdar",
  "pandfdfda",
  "kodfala",
  "tidfdger",
  "lidfdfon",
  "cdfdow",
  "pig",
  "frog",
  "monkey",
  "chicken",
  "penguin",
  "bird",
  "duck",
  "owl",
  "bat",
  "wolf",
  "boar",
  "horse",
  "unicorn",
  "bee",
  "bug",
  "butterfly",
  "snail",
  "ladybug",
  "ant",
  "cricket",
  "spider",
  "scorpion",
  "mosquito",
  "fly",
  "turtle",
  "snake",
  "lizard",
  "t-rex",
  "sauropod",
];

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 });
  const [uniqueCardCount, setUniqueCardCount] = useState(6);
  const [inputCardCount, setInputCardCount] = useState("6");

  useEffect(() => {
    initializeGame();
    window.addEventListener("resize", updateGridDimensions);
    return () => window.removeEventListener("resize", updateGridDimensions);
  }, [uniqueCardCount]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameComplete(true);
    }
  }, [cards]);

  const initializeGame = () => {
    const emojis = allEmojis.slice(0, uniqueCardCount);
    const shuffledEmojis = [...emojis, ...emojis].sort(
      () => Math.random() - 0.5
    );
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      content: emoji,
      flipped: false,
      matched: false,
    }));
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    updateGridDimensions();
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched)
      return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    if (cards[firstId].content === cards[secondId].content) {
      const newCards = [...cards];
      newCards[firstId].matched = true;
      newCards[secondId].matched = true;
      setCards(newCards);
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstId].flipped = false;
        newCards[secondId].flipped = false;
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  const updateGridDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const aspectRatio = width / height;

    // Function to determine the number of columns based on the aspect ratio
    const getColumns = () => {
      if (aspectRatio < 0.5) return 2; // Very tall screens
      if (aspectRatio < 1) return 3; // Tall screens
      if (aspectRatio < 1.5) return 4; // Slightly tall screens
      if (aspectRatio < 2) return 5; // Balanced screens
      if (aspectRatio < 2.5) return 6; // Wide screens
      if (aspectRatio < 3) return 8; // Very wide screens
      return 10; // Extra wide screens
    };

    const cols = getColumns();
    const totalCards = uniqueCardCount * 2;
    const rows = Math.ceil(totalCards / cols);

    setGridDimensions({ rows, cols });
  };

  const handleCardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCardCount(e.target.value);
  };

  const applyCardCount = () => {
    let newCount = Math.max(
      1,
      Math.min(parseInt(inputCardCount) || 1, allEmojis.length)
    );
    setUniqueCardCount(newCount);
    setInputCardCount(newCount.toString());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">משחק הזיכרון</h1>
      <div className="mb-4 text-xl">Moves: {moves}</div>

      <div
        className="grid gap-3 mb-4 w-full max-w-5xl"
        style={{
          gridTemplateRows: `repeat(${gridDimensions.rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${gridDimensions.cols}, minmax(0, 1fr))`,
          aspectRatio: `${gridDimensions.cols} / ${gridDimensions.rows}`,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`aspect-square flex items-center justify-center cursor-pointer transition-all duration-300 ${
              card.flipped || card.matched ? "bg-white" : "bg-blue-500"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="flex items-center justify-center text-2xl font-bold p-0">
              {card.flipped || card.matched ? card.content : ""}
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
  );
}
