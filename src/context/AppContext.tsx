"use client";
import { GameResult, WordPair } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  words: WordPair[];
  setWords: (words: WordPair[]) => void;
  gameResult: GameResult | null;
  setGameResult: (result: GameResult) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [words, setWords] = useState<WordPair[]>([]);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  console.log("Current words:", words);
  return (
    <AppContext.Provider value={{ words, setWords, gameResult, setGameResult }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
