import { GameSettings } from "@/lib/types";

export const settingsInfo = (
  gameSettings: GameSettings,
  updateGameSettings: (settings: Partial<GameSettings>) => void
) => [
  {
    id: "timed-mode",
    title: "⏱️ Timed Mode",
    description:
      "Adds a challenge by limiting the time you have to finish the game.",
    details: `In this mode, the game starts with a set amount of time based on how many cards you are playing with. 

              Here's how it works:
              - The game starts with 60 seconds if you are playing with 5 words (10 cards).
              - For every 5 additional words (which equals 10 more cards), you receive an extra 40 seconds.
              - Every time you find a matching pair of cards, you are rewarded with an additional 5 seconds.
              - The goal is to find all pairs before the timer reaches zero.
              
              If you run out of time, the game ends, and you lose. This system makes the game more challenging, as you need to find pairs quickly while managing your time. You can turn this feature on or off using the toggle button.`,
    checked: gameSettings.timedMode,
    onChange: (checked: boolean) => {
      updateGameSettings({ timedMode: checked });
    },
    emoji: "⚡",
  },
  {
    id: "disqualification-mode",
    title: "🚫 Disqualification Mode",
    description:
      "Adds a challenge by limiting the number of mistakes you can make.",
    details: `The penalty system introduces a limited number of chances (called "lives") 
              that decrease every time you fail to match two cards. You start with a certain number 
              of lives depending on how many cards you choose to play with. For example, if you 
              play with 10 cards (5 pairs), you'll start with 3 lives. The more cards you add, the 
              more lives you get, but it becomes harder to win.

              Each time you pick two cards that don't match, you lose a life. If you run out of lives 
              before matching all the pairs, the game is over. This system makes the game more 
              challenging and adds excitement as you have to find all pairs before losing all your 
              lives. You can turn this feature on or off by using the toggle button.`,
    checked: gameSettings.disqualificationMode,
    onChange: (checked: boolean) => {
      updateGameSettings({ disqualificationMode: checked });
    },
    emoji: "💀",
  },
  {
    id: "reveal-cards-mode",
    title: "👁‍🗨 Reveal Cards Mode",
    description: "Briefly show  all cards face-up at the start of the game.",
    details: `In this mode, all cards are revealed for a short time (800 milisecond) at the start of the game.   
          Here's how it works:
          - When the game starts, all the cards are shown face-up for 800 milisecond.
          - This gives the player a brief moment to memorize the positions of the cards.
          - After 800 milisecond, the cards flip back face-down, and the game continues as usual.
          
          This setting helps players get a quick glimpse of the cards before they start matching. 
          You can turn this feature on or off using the toggle button.`,
    checked: gameSettings.showCardsMode,
    onChange: (checked: boolean) => {
      updateGameSettings({ showCardsMode: checked });
    },
    emoji: "🔍",
  },
];
