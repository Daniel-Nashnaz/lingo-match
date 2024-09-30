"use client";
import { GameResult, GameSettings, WordPair } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  words: WordPair[];
  setWords: (words: WordPair[]) => void;
  gameResult: GameResult | null;
  setGameResult: (result: GameResult) => void;
  gameSettings: GameSettings;
  updateGameSettings: (settings: Partial<GameSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [words, setWords] = useState<WordPair[]>([]);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    disqualificationMode: false,
    timedMode: false,
  });
  console.log("Current words:", words);

  const updateGameSettings = (settings: Partial<GameSettings>) => {
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      ...settings,
    }));
  };
  return (
    <AppContext.Provider
      value={{
        words,
        setWords,
        gameResult,
        setGameResult,
        gameSettings,
        updateGameSettings,
      }}
    >
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
