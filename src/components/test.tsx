"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Zap } from "lucide-react";

type WordPair = {
  id: number;
  known: string;
  learning: string;
};

type CardType = {
  id: number;
  word: string;
  type: "known" | "learning";
};

const MemoryGame: React.FC = () => {
  const [gameState, setGameState] = useState<
    "welcome" | "input" | "game" | "summary"
  >("welcome");
  const [wordPairs, setWordPairs] = useState<WordPair[]>([
    { id: 1, known: "חתול", learning: "cat" },
    { id: 2, known: "כלב", learning: "dog" },
    { id: 3, known: "דג", learning: "fish" },
    { id: 4, known: "פרה", learning: "cow" },
  ]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameTime, setGameTime] = useState<number>(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "game" && gameStartTime) {
      timer = setInterval(() => {
        setGameTime(Math.floor((Date.now() - gameStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, gameStartTime]);

  const startGame = () => setGameState("input");

  const addWordPair = () =>
    setWordPairs([...wordPairs, { id: 5, known: "", learning: "" }]);

  const updateWordPair = (
    index: number,
    field: "known" | "learning",
    value: string
  ) => {
    const newPairs = [...wordPairs];
    newPairs[index][field] = value;
    setWordPairs(newPairs);
  };

  const shuffleCards = (): CardType[] => {
    const allWords: CardType[] = wordPairs.flatMap((pair) => [
      { id: pair.id, word: pair.known, type: "known" },
      { id: pair.id, word: pair.learning, type: "learning" },
    ]);
    return allWords.sort(() => Math.random() - 0.5);
  };

  const initializeGame = () => {
    setCards(shuffleCards());
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
    setGameTime(0);
    setGameStartTime(Date.now());
    setGameState("game");
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndexes.length === 2 ||
      flippedIndexes.includes(index) ||
      matchedPairs.includes(index)
    )
      return;

    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.length === 2) {
      console.log(newFlipped);
      console.log(cards);

      const [firstIndex, secondIndex] = newFlipped;

      console.log(cards[firstIndex].type);
      console.log(cards[secondIndex].type);

      if (
        cards[firstIndex].id === cards[secondIndex].id &&
        cards[firstIndex].type !== cards[secondIndex].type
      ) {
        setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
        setScore(score + 1);
        setFlippedIndexes([]);
      } else {
        setTimeout(() => setFlippedIndexes([]), 1000);
      }
    }

    if (score + 1 === wordPairs.length) {
      setTimeout(() => {
        setShowSummary(true);
        setGameState("summary");
      }, 1000);
    }
  };

  const renderWelcome = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-md mx-auto mt-10 text-center"
    >
      <h1 className="text-4xl font-bold mb-6 text-primary">
        משחק זיכרון לשפות
      </h1>
      <p className="text-xl mb-8">למד שפות חדשות באמצעות משחק זיכרון מהנה!</p>
      <Button onClick={startGame} size="lg" className="w-full mb-4">
        התחל משחק
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        הגדרות
      </Button>
    </motion.div>
  );

  const renderInputScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-3xl mx-auto mt-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">הזנת מילים</h2>
      <Tabs defaultValue="wordInput" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wordInput">הזנת מילים</TabsTrigger>
          <TabsTrigger value="settings">הגדרות משחק</TabsTrigger>
        </TabsList>
        <TabsContent value="wordInput">
          {wordPairs.map((pair, index) => (
            <div key={index} className="flex space-x-2 mb-4">
              <Input
                placeholder="מילה בשפה מוכרת"
                value={pair.known}
                onChange={(e) => updateWordPair(index, "known", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="מילה בשפה נלמדת"
                value={pair.learning}
                onChange={(e) =>
                  updateWordPair(index, "learning", e.target.value)
                }
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  /* implement delete */
                }}
              >
                🗑️
              </Button>
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <Button onClick={addWordPair} variant="outline">
              הוסף זוג מילים
            </Button>
            <Button onClick={initializeGame}>התחל משחק</Button>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          {/* כאן תוכל להוסיף הגדרות נוספות למשחק */}
          <p className="text-center text-gray-500">
            הגדרות נוספות יתווספו בקרוב
          </p>
        </TabsContent>
      </Tabs>
    </motion.div>
  );

  const renderGameScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <Trophy className="text-yellow-500 text-xl sm:text-2xl" />
          <span className="text-xl sm:text-2xl font-bold">
            {score} / {wordPairs.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="text-blue-500 text-xl sm:text-2xl" />
          <span className="text-lg sm:text-xl">{gameTime}s</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="text-green-500 text-xl sm:text-2xl" />
          <span className="text-lg sm:text-xl">{moves} מהלכים</span>
        </div>
      </div>

      <Progress value={(score / wordPairs.length) * 100} className="mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative w-full h-32 cursor-pointer"
              onClick={() => handleCardClick(index)}
              style={{ perspective: "1000px" }} // Enable 3D perspective
            >
              {/* Front side (Question mark) */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    flippedIndexes.includes(index) ||
                    matchedPairs.includes(index)
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-white text-2xl font-bold backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  transform:
                    flippedIndexes.includes(index) ||
                    matchedPairs.includes(index)
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                }}
              >
                <Card className="w-full h-full">
                  <CardContent className="flex items-center justify-center h-full text-2xl font-bold">
                    ?
                  </CardContent>
                </Card>
              </motion.div>

              {/* Back side (Word) */}
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{
                  rotateY:
                    flippedIndexes.includes(index) ||
                    matchedPairs.includes(index)
                      ? 0
                      : 180,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-green-100 text-2xl font-bold backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  transform:
                    flippedIndexes.includes(index) ||
                    matchedPairs.includes(index)
                      ? "rotateY(0deg)"
                      : "rotateY(180deg)",
                }}
              >
                <Card className="w-full h-full bg-green-100">
                  <CardContent className="flex items-center justify-center h-full text-2xl font-bold">
                    {card.word}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Button className="mt-6 w-full" onClick={initializeGame}>
        התחל מחדש
      </Button>
    </motion.div>
  );

  const renderSummary = () => (
    <Dialog open={showSummary} onOpenChange={setShowSummary}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">
            סיכום המשחק
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <p className="text-4xl font-bold mb-6">כל הכבוד!</p>
          <div className="space-y-2 mb-6">
            <p className="text-xl">
              ניקוד סופי:{" "}
              <span className="font-bold">
                {score} / {wordPairs.length}
              </span>
            </p>
            <p className="text-xl">
              מספר מהלכים: <span className="font-bold">{moves}</span>
            </p>
            <p className="text-xl">
              זמן משחק: <span className="font-bold">{gameTime} שניות</span>
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              setShowSummary(false);
              setGameState("input");
            }}
          >
            משחק חדש
          </Button>
          <Button
            onClick={() => {
              setShowSummary(false);
              initializeGame();
            }}
            variant="outline"
          >
            שחק שוב
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const renderContent = () => {
    switch (gameState) {
      case "welcome":
        return renderWelcome();
      case "input":
        return renderInputScreen();
      case "game":
        return renderGameScreen();
      case "summary":
        return renderSummary();
      default:
        return <div>שגיאה: מצב לא ידוע</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {renderContent()}
    </div>
  );
};

export default MemoryGame;
