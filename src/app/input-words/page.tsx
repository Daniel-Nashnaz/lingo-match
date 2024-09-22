"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { WordPair, WordPairType } from "@/lib/types";
import { confirmAction } from "@/lib/utils/notificationUtils";
import { useAppContext } from "@/context/AppContext";
import {
  DURATION_ERROR,
  NUM_OF_PAIRS,
  DURATION_SUCCSS,
} from "@/lib/utils/constants";
/*
const INITIAL_WORD_PAIRS: WordPair[] = [
  { id: uuidv4(), wordKnown: "חתול", wordLearn: "cat" },
  { id: uuidv4(), wordKnown: "כלב", wordLearn: "dog" },
  { id: uuidv4(), wordKnown: "דג", wordLearn: "fish" },
  { id: uuidv4(), wordKnown: "פרה", wordLearn: "cow" },
  { id: uuidv4(), wordKnown: "ארנב", wordLearn: "rabbit" },
];
*/

export default function InputPage() {
  const router = useRouter();
  const { words, setWords } = useAppContext();
  const [wordPairs, setWordPairs] = useState<WordPair[]>(words);
  const [newPair, setNewPair] = useState<WordPair>({
    wordKnown: "",
    wordLearn: "",
  });

  const addWordPair = useCallback(() => {
    if (newPair.wordKnown.trim() && newPair.wordLearn.trim()) {
      setWordPairs((prev) => [...prev, { ...newPair, id: uuidv4() }]);
      setNewPair({ wordKnown: "", wordLearn: "" });
      toast.success("New word pair added", { duration: DURATION_SUCCSS });
    } else {
      toast.error("Please fill in both fields", { duration: DURATION_ERROR });
    }
  }, [newPair]);

  const updateWordPair = (
    index: number,
    field: WordPairType,
    value: string
  ) => {
    if (index) {
      const newPairs = [...wordPairs];
      newPairs[index][field] = value;
      setWordPairs(newPairs);
    }
  };

  /**
   * removeWordPair Function
   *
   * Asynchronously removes a word pair from the state after user confirmation.
   *
   * @param {string} id - The unique identifier of the word pair to be removed.
   *
   * Process:
   * 1. Calls `confirmAction` to display a confirmation toast asking the user to confirm
   *    the deletion of the specific word pair.
   * 2. If the user confirms, the word pair is removed from the `wordPairs` state.
   * 3. Displays a success toast notification indicating the word pair has been removed.
   *
   * Dependencies:
   * - `confirmAction`: Used to handle the confirmation dialog and resolve the action.
   *
   * Usage:
   * This function is typically called in response to a user's click event on a delete button
   * associated with a word pair.
   */
  const removeWordPair = async (index: number) => {
    const confirmed: boolean = await confirmAction(() => {
      const newPairs = wordPairs.filter((_, i) => i !== index);
      setWordPairs(newPairs);
    }, "Are you sure you want to delete this word pair?");
    if (confirmed)
      toast.success("Word pair removed", { duration: DURATION_ERROR });
  };

  const clearAllWordPairs = async () => {
    const confirmed: boolean = await confirmAction(
      () => setWordPairs([]),
      "Are you sure you want to delete all word pairs?"
    );
    if (confirmed)
      toast.success("All word pairs have been deleted", {
        duration: DURATION_ERROR,
      });
  };

  const startGame = () => {
    if (wordPairs.length < NUM_OF_PAIRS) {
      toast.error(`Please add at least ${NUM_OF_PAIRS} word pairs`, {
        duration: DURATION_ERROR,
      });
      return;
    }
    const validWordPairs = wordPairs.filter(
      (pair) => pair.wordKnown.trim() && pair.wordLearn.trim()
    );
    if (validWordPairs.length < wordPairs.length) {
      toast.error(`Please input valid word pairs`, {
        duration: DURATION_ERROR,
      });
    } else {
      setWords(wordPairs);
      router.push("/game");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Enter Words</h2>
        <Tabs defaultValue="wordInput" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wordInput">Word Input</TabsTrigger>
            <TabsTrigger value="settings">Game Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="wordInput">
            <div className="space-y-2">
              <AnimatePresence>
                {wordPairs.map((pair, index) => (
                  <motion.div
                    key={pair.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center gap-2 p-2 rounded-md"
                  >
                    <Input
                      value={pair.wordKnown}
                      onChange={(e) =>
                        updateWordPair(
                          index,
                          WordPairType.WORDKNOWN,
                          e.target.value
                        )
                      }
                      className="input-style"
                    />
                    <Input
                      value={pair.wordLearn}
                      onChange={(e) =>
                        updateWordPair(
                          index,
                          WordPairType.WORDLEARN,
                          e.target.value
                        )
                      }
                      className="input-style"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeWordPair(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
                <Input
                  placeholder="Known"
                  value={newPair.wordKnown}
                  onChange={(e) =>
                    setNewPair({ ...newPair, wordKnown: e.target.value })
                  }
                  className="input-style"
                />
                <Input
                  placeholder="Learning "
                  value={newPair.wordLearn}
                  onChange={(e) =>
                    setNewPair({ ...newPair, wordLearn: e.target.value })
                  }
                  className="input-style"
                />
                <Button onClick={addWordPair} className="w-full sm:w-auto">
                  <Plus className="mr-2" /> Add
                </Button>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
              <Button
                onClick={clearAllWordPairs}
                variant="outline"
                className="w-full sm:w-auto hover:bg-red-600"
              >
                Clear All
              </Button>
              <Button onClick={startGame} className="w-full sm:w-auto">
                <Save className="mr-2" /> Save and Start Game
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-center text-gray-500">
              Additional settings will be added soon
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
