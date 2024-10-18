import React from "react";

/**
 * Props for the HeartDisplay component
 * @property {number} currentGameLife - The current life of the player
 * @property {number} totalLife - The total life the player starts with
 */
interface HeartDisplayProps {
  currentGameLife: number;
  totalLife: number;
}

/**
 * HeartDisplay component renders a visual representation of the player's life in the form of hearts.
 *
 * The component displays:
 * - Full hearts based on the current game life.
 * - A partially filled heart if the current life is not a multiple of the total life divided by 3.
 * - Empty hearts for remaining life capacity.
 *
 * @param {HeartDisplayProps} props - The properties for the HeartDisplay component.
 * @returns {JSX.Element} The rendered HeartDisplay component.
 */
const HeartDisplay: React.FC<HeartDisplayProps> = ({
  currentGameLife,
  totalLife,
}) => {
  const heartWidth = 24; // width of each heart in pixels
  const hearts = [];
  const fullHearts = Math.floor(currentGameLife / (totalLife / 3));
  const partialHeart = currentGameLife % (totalLife / 3);

  for (let i = 0; i < 3; i++) {
    if (i < fullHearts) {
      hearts.push(
        <svg
          key={i}
          width={heartWidth}
          height={heartWidth}
          viewBox="0 0 24 24"
          fill="red"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    } else if (i === fullHearts && partialHeart > 0) {
      // Render partial heart
      const partialWidth = (partialHeart / (totalLife / 3)) * heartWidth;
      hearts.push(
        <svg key={i} width={heartWidth} height={heartWidth} viewBox="0 0 24 24">
          <defs>
            <clipPath id={`clip-${i}`}>
              <rect x="0" y="0" width={partialWidth} height={heartWidth} />
            </clipPath>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#d1d5db"
          />
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="red"
            clipPath={`url(#clip-${i})`}
          />
        </svg>
      );
    } else {
      // Render empty heart
      hearts.push(
        <svg
          key={i}
          width={heartWidth}
          height={heartWidth}
          viewBox="0 0 24 24"
          fill="#d1d5db"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {hearts}
      <span className="text-sm text-gray-600">({currentGameLife})</span>
    </div>
  );
};

export default HeartDisplay;
