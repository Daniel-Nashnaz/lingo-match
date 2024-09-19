"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { WordPair, WordPairType } from "@/lib/types";

export default function InputPage() {
  const router = useRouter();
  const [wordPairs, setWordPairs] = useState<WordPair[]>([
    { wordKnown: "חתול", wordLearn: "cat" },
    { wordKnown: "כלב", wordLearn: "dog" },
    { wordKnown: "דג", wordLearn: "fish" },
    { wordKnown: "פרה", wordLearn: "cow" },
  ]);
  const [newPair, setNewPair] = useState<WordPair>({
    wordKnown: "",
    wordLearn: "",
  });

  const addWordPair = () => {
    if (newPair.wordKnown.trim() && newPair.wordLearn.trim()) {
      setWordPairs([...wordPairs, { ...newPair }]);
      setNewPair({ wordKnown: "", wordLearn: "" });
      toast.success("New word pair added");
    } else {
      toast.error("Please fill in both fields");
    }
  };

  const updateWordPair = (
    index: number | undefined,
    field: WordPairType,
    value: string
  ) => {
    if (index) {
      const newPairs = [...wordPairs];
      newPairs[index][field] = value;
      setWordPairs(newPairs);
    }
  };

  const removeWordPair = (index: number) => {
    const newPairs = wordPairs.filter((_, i) => i !== index);
    setWordPairs(newPairs);
    toast.success("Word pair removed");
  };

  const startGame = () => {
    console.log(wordPairs);

    if (wordPairs.length < 5) {
      toast.error("Please add at least 5 word pairs");
    } else {
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
                onClick={() => {
                  setWordPairs([]);
                }}
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
