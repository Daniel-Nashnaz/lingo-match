"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/lib/types";
import { useAppContext } from "@/context/AppContext";
const cards: Card[] = [
  { id: "1", wordKnown: "שלום", wordNew: "Hello" },
  { id: "2", wordKnown: "תודה", wordNew: "Thank you" },
  { id: "3", wordKnown: "ספר", wordNew: "Book" },
  { id: "4", wordKnown: "כלב", wordNew: "Dog" },
  { id: "5", wordKnown: "חתול", wordNew: "Cat" },
  { id: "6", wordKnown: "בית", wordNew: "House" },
  { id: "7", wordKnown: "מכונית", wordNew: "Car" },
  { id: "8", wordKnown: "גינה", wordNew: "Garden" },
  { id: "9", wordKnown: "מים", wordNew: "Water" },
  { id: "10", wordKnown: "מוזיקה", wordNew: "Music" }
];

export default function EnterWords() {
  const { setWords } = useAppContext();
  const [wordPairs, setWordPairs] = useState<Card[]>([]);
  const router = useRouter();

  const handleAddWordPair = () => {
    setWordPairs([...wordPairs, { wordKnown: "", wordNew: "" }]);
  };

  const handleStartGame = () => {
    setWordPairs([{ wordKnown: "חתול", wordNew: "cat" } ]);
    console.log(wordPairs);
    
    setWords(cards); // שמירה ב-Context
    router.push("/game");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen"
      dir="rtl"
    >
      <h2 className="text-2xl mb-4">הזן את המילים שלך</h2>
      <input className="mb-4 p-2 border" placeholder="מילה בשפת האם" />
      <input className="mb-4 p-2 border" placeholder="מילה בשפה החדשה" />
      
      <Button onClick={handleAddWordPair} className="bg-green-500 text-white m-3">הוסף זוג מילים</Button>
      <Button onClick={handleStartGame} className="bg-green-500 text-white">שמור והתחל משחק</Button>


    </motion.div>
  );
}
