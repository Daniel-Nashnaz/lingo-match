import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Game</h1>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200">
          <Link href="/enter-words">Start Game</Link>
        </Button>
      </div>
    </div>
  );
}
