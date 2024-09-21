import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">Memory Game for Languages</h1>
        <p className="text-xl mb-8">Learn new languages through a fun memory game!</p>
        <Link href="/input-words">
          <Button size="lg" className="w-full mb-4">
            Start Game
          </Button>
        </Link>
        <Button variant="outline" size="lg" className="w-full">
          Settings
        </Button>
      </div>
    </div>
  );
}
