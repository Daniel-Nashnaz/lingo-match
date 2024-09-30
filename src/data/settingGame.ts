import { GameSettings } from "@/lib/types";

export const settingsInfo = (
  gameSettings: GameSettings,
  updateGameSettings: (settings: Partial<GameSettings>) => void
) => [
  {
    id: "timed-mode",
    title: "⏱️ Timed Mode",
    description: "Enable a timer for each question during the game.",
    details:
      "In timed mode, you have 20 seconds to answer each question. The game requires a minimum of 5 word pairs. This adds an element of pressure and helps improve your quick recall skills.",
    checked: gameSettings.timedMode,
    onChange: (checked: boolean) => {
      updateGameSettings({ timedMode: checked });
    },
    emoji: "⚡",
  },
  {
    id: "disqualification-mode",
    title: "🚫 Disqualification Mode",
    description: "End the game immediately on the first incorrect answer.",
    details:
      "In disqualification mode, precision is key. One wrong answer, and it's game over! This mode simulates high-stakes language situations, pushing you to be 100% accurate. It's perfect for:\n\n1. Testing your mastery of learned words\n2. Improving focus and attention to detail\n3. Preparing for language exams or important presentations\n4. Challenging yourself to maintain a perfect streak\n\nRemember, in real-life language use, sometimes a single misunderstanding can change everything. This mode helps you develop the accuracy needed for crucial conversations.",
    checked: gameSettings.disqualificationMode,
    onChange: (checked: boolean) => {
      updateGameSettings({ disqualificationMode: checked });
    },
    emoji: "💀",
  },
];
