import MemoryGame from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  //     <div className="flex flex-col items-center justify-center h-screen">
  //     <h1 className="text-4xl font-bold mb-6">ברוכים הבאים למשחק הזיכרון ללימוד שפות</h1>
  //     <p className="text-lg mb-4">
  //       למד שפות חדשות דרך משחקים אינטראקטיביים ותיהנה מחוויית לימוד כיפית
  //     </p>
  //       <Button className="mb-4 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200">
  //         <Link href="/enter-words">Start Game</Link>
  //       </Button>
  //     </div>
  //   </div>

  // );
  return(<><MemoryGame/></>)
}
