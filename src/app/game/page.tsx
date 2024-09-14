"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { CardGame } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent } from "@/components/ui/card";
import { Shuffle } from "lucide-react";
export default function Game() {

    const { words } = useAppContext();
    const [cards, setCards] = useState<CardGame[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [moves, setMoves] = useState<number>(0);
    const [gameComplete, setGameComplete] = useState<boolean>(false);

    useEffect(() => {
        const cardPairs: CardGame[] = words.flatMap((word, index) => {
            const uniqueId = uuidv4();
            return [
                { word: word.wordKnown, id: index * 2, isFlipped: false, isMatched: false, identityMatched: uniqueId },
                { word: word.wordNew, id: index * 2 + 1, isFlipped: false, isMatched: false, identityMatched: uniqueId },
            ]
        });

        setCards(shuffleArray(cardPairs));
    }, [words]);

    const shuffleArray = (array: CardGame[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (id: number) => {
        // לוגיקת המשחק כמו שהייתה
    };

    const test = () => {

        console.log(cards);

    }

    // return (
    //     <motion.div
    //         className="flex flex-col items-center justify-center h-screen"
    //     >
    //         <h2 className="text-2xl mb-4">משחק זיכרון</h2>
    //         <div>
    //             {/* כאן תופיע לוגיקת המשחק שלך */}
    //         </div>
    //         <Link href="/result">
    //             <p className="block mt-4 text-blue-500 hover:underline">סיים את המשחק</p>
    //         </Link>
    //         <Button onClick={test}>Test</Button>
    //     </motion.div>
    // );

    return (<>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Word Translation Memory Game</h1>
            <div className="mb-4 text-lg">Moves: {moves}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        className={`w-32 h-32 cursor-pointer transition-all duration-300 ${card.isFlipped || card.isMatched ? 'bg-white' : 'bg-primary'
                            }`} 
                        onClick={() => handleCardClick(card.id)}
                    >
                        <CardContent className="p-4 h-full flex items-center justify-center">
                            {card.isFlipped || card.isMatched ? (
                                <div className="text-center">
                                    <div className="font-semibold">{card.word}</div>
                                    <div className="text-sm text-muted-foreground">{card.word}</div>
                                </div>
                            ) : (
                                <span className="sr-only">Card face down</span>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Button className="flex items-center">
                <Shuffle className="mr-2 h-4 w-4" /> New Game
            </Button>
            {gameComplete && (
                <div className="mt-4 text-xl font-bold text-green-600" role="alert">
                    Congratulations! You completed the game in {moves} moves!
                </div>
            )}
        </div>

    </>)
}
