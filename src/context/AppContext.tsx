"use client";
import { Card } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
    words: Card[];
    setWords: (words: Card[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [words, setWords] = useState<Card[]>([]);
    return (
        <AppContext.Provider value={{ words, setWords }}>
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
