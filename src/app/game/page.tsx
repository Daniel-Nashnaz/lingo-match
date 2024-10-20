"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppContext } from "@/context/AppContext";
import { CardGame } from "@/lib/types";
import {
  DURATION_ERROR,
  DURATION_SHOW_CARDS,
  DURATION_SUCCSS,
  EXTRA_TIME_OF_MATCH_PAIR,
} from "@/lib/utils/constants";
import ToastConfig, { confirmAction } from "@/lib/utils/notificationUtils";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Trophy, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  calculateGameLives,
  calculateGameTimes,
  generateCardPairs,
} from "./gameHelpers";
import HeartDisplay from "@/components/game/heartDisplay";
import ErrorBoundary from "@/components/utils/errorBoundary";
export default function Game() {
  const router = useRouter();
  const { words, gameSettings, setGameResult } = useAppContext();
  const [cards, setCards] = useState<CardGame[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameLife, setGameLife] = useState<number>(calculateGameLives(words));
  const [moves, setMoves] = useState<number>(0);
  const [gameTime, setGameTime] = useState<number>(0);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameTimeLeft, setGameTimeLeft] = useState<number>(
    calculateGameTimes(words)
  );
  const [isShowCards, setShowCards] = useState<boolean>(
    gameSettings.showCardsMode
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastGameTimeRef = useRef<number>(0);

  useEffect(() => {
    if (words.length === 0) {
      toast.error("Please add word pairs before starting the game.", {
        autoClose: DURATION_ERROR,
      });
      router.push("/input-words");
    } else {
      setCards(generateCardPairs(words));
      setGameTime(0);
      startTimer();
    }
  }, [words, router]);

  useEffect(() => {
    lastGameTimeRef.current = gameTime;
  }, [gameTime]);

  useEffect(() => {
    let idInterval: NodeJS.Timeout;
    if (!isPaused && gameSettings.timedMode) {
      idInterval = setInterval(() => {
        setGameTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(idInterval);
            setIsWinner(() => false);
            gameOverInit();
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(idInterval);
  }, [isPaused, gameSettings.timedMode]);

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setGameTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isPaused) {
      pauseTimer();
    } else {
      startTimer();
    }
  }, [isPaused]);

  useEffect(() => {
    if (isShowCards) {
      setTimeout(() => {
        setShowCards(false);
      }, DURATION_SHOW_CARDS);
    }
  }, [isShowCards]);

  const onCardClick = (index: number) => {
    // Prevent action if two cards are already flipped or if the card is already matched/flipped
    if (
      isPaused ||
      flippedIndexes.length === 2 ||
      matchedPairs.includes(index) ||
      flippedIndexes.includes(index)
    )
      return;

    const updatedFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(updatedFlippedIndexes);
    setMoves((prevMoves) => prevMoves + 1);

    if (updatedFlippedIndexes.length === 2) {
      const [firstIndex, secondIndex] = updatedFlippedIndexes;
      const isMatch =
        cards[firstIndex].identityMatched ===
        cards[secondIndex].identityMatched;

      if (isMatch) {
        setMatchedPairs((prev) => [...prev, firstIndex, secondIndex]);
        setScore((prevScore) => prevScore + 1);
        if (gameSettings.timedMode) {
          setGameTimeLeft(
            (prevTimeLeft) => prevTimeLeft + EXTRA_TIME_OF_MATCH_PAIR
          );
          toast.info(`Great job! ${EXTRA_TIME_OF_MATCH_PAIR} seconds added.`, {
            autoClose: DURATION_SUCCSS,
          });
        }
        if (score + 1 === words.length) {
          setTimeout(() => {
            gameOverInit();
          }, 1000);
        }
        setFlippedIndexes([]);
      } else {
        setTimeout(() => setFlippedIndexes([]), 1000);
        setGameLife((prevLife) => Math.max(0, prevLife - 1));
        if (gameSettings.disqualificationMode && gameLife - 1 <= 0) {
          setTimeout(() => {
            setIsWinner(() => false);
            gameOverInit();
          }, 500);
        }
      }
    }
  };
  const gameOverInit = () => {
    pauseTimer();
    setGameResult({
      gameTime: lastGameTimeRef.current,
      moves: moves <= 0 ? moves : moves + 1,
      score: score,
      isWin: isWinner,
    });
    router.push("summary-game");
    pauseTimer();
  };
  const restartGame = async () => {
    const confirmed: boolean = await confirmAction(
      () => router.push("/input-words"),
      "Are you sure you want to Restart Game?"
    );
    if (confirmed) {
      toast.success("The game restarted", { autoClose: DURATION_ERROR });
      pauseTimer();
    }
  };
  return (
    <>
      <ErrorBoundary>
        <ToastConfig />
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
                {score} / {words.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="text-green-500 text-xl sm:text-2xl" />
              <span className="text-lg sm:text-xl">{moves} Moves</span>
            </div>
            {gameSettings.timedMode ? (
              <div className="flex items-center space-x-2">
                <Clock className="text-blue-500 text-xl sm:text-2xl" />
                <span
                  className={`{text-lg sm:text-xl ${
                    gameTimeLeft <= 10
                      ? "text-red-600 animate-pulse"
                      : "text-black"
                  }`}
                >
                  Time Left: {gameTimeLeft}s
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Clock className="text-blue-500 text-xl sm:text-2xl" />
                <span className="text-lg sm:text-xl">{gameTime}s</span>
              </div>
            )}
            {gameSettings.disqualificationMode && (
              <div className="flex items-center space-x-2">
                <HeartDisplay
                  currentGameLife={gameLife}
                  totalLife={calculateGameLives(words)}
                />
              </div>
            )}
          </div>
          <Progress value={(score / words.length) * 100} className="mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  className="relative w-full h-32 cursor-pointer"
                  onClick={() => onCardClick(index)}
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
                    transition={{ autoClose: 0.6 }}
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
                        <span>❓</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Back side (Word) */}
                  <motion.div
                    initial={{ rotateY: 180 }}
                    animate={{
                      rotateY:
                        flippedIndexes.includes(index) ||
                        matchedPairs.includes(index) ||
                        isShowCards
                          ? 0
                          : 180,
                    }}
                    transition={{ autoClose: 0.6 }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-green-100 text-2xl font-bold backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      transform:
                        flippedIndexes.includes(index) ||
                        matchedPairs.includes(index) ||
                        isShowCards
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
          <div className="flex justify-center space-x-8 mt-8">
            <Button
              className="bg-blue-500 hover:bg-neutral-500"
              onClick={() => setIsPaused((prev) => !prev)}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="destructive" onClick={() => restartGame()}>
              Reset Game
            </Button>
          </div>
        </motion.div>
      </ErrorBoundary>
    </>
  );
}
