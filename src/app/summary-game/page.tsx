"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Loading from "../loading";

export default function SummaryPage() {
  const router = useRouter();
  const { gameResult } = useAppContext();

  useEffect(() => {
    if (!gameResult) {
      router.push("/input-words");
    }
  }, [gameResult, router]);

  if (!gameResult) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-black">Game Summary</h1>
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <p className="text-2xl sm:text-4xl font-bold mb-6 text-slate-900">
          {gameResult.isWin ? "Congratulations!" : "Better Luck Next Time!"}
        </p>
        <div className="space-y-2 mb-6">
          <p className="text-xl text-black">
            Final Score:{" "}
            <span className="font-bold text-yellow-500">
              {gameResult.score}
            </span>
          </p>
          <p className="text-xl text-black">
            Number of Moves:{" "}
            <span className="font-bold text-green-500">{gameResult.moves}</span>
          </p>
          <p className="text-xl text-black">
            Game Time:{" "}
            <span className="font-bold text-blue-500">
              {gameResult.gameTime} seconds
            </span>
          </p>
        </div>
        <div className="space-y-4 flex flex-col items-center">
          <Button onClick={() => router.push("/input-words")} className="w-48">
            New Game
          </Button>
          <Button
            onClick={() => router.push("/game")}
            variant="outline"
            className="w-48 text-black"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
