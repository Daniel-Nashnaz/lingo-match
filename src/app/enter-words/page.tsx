"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function EnterWords() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <h2 className="text-2xl mb-4">הזן את המילים שלך</h2>
      <input className="mb-4 p-2 border" placeholder="מילה בשפת האם" />
      <input className="mb-4 p-2 border" placeholder="מילה בשפה החדשה" />
      <Button className="bg-green-500 text-white">שמור והתחל משחק</Button>
    </motion.div>
  );
}
