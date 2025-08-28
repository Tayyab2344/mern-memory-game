import { useEffect, useState } from "react";
import API from "../components/api/api";

const difficulties = {
  easy: 8,
  medium: 16,
  hard: 32,
};
const gridColumns = {
  easy: 4,
  medium: 4,
  hard: 8,
};

const emojis = [
  "🍎",
  "🍌",
  "🍒",
  "🍇",
  "🍉",
  "🍓",
  "🍑",
  "🍍",
  "🥥",
  "🥝",
  "🥑",
  "🍆",
  "🥔",
  "🥕",
  "🌽",
  "🌶️",
  "🥒",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🍄",
  "🥜",
  "🌰",
  "🍞",
  "🥐",
  "🥖",
  "🥨",
  "🥯",
  "🥞",
  "🧇",
  "🧀",
];

const GamePage = () => {
  const [mode, setMode] = useState("");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const generateCards = (difficulty) => {
    const size = difficulties[difficulty];
    const selectedEmojis = emojis.slice(0, size / 2);
    const pair = [...selectedEmojis, ...selectedEmojis];
    const shuffled = pair.sort(() => Math.random() - 0.5);
    return shuffled.map((value, index) => ({ id: index, value }));
  };

  const startGame = () => {
    setCards(generateCards(mode));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setTimerActive(true);
  };

  const handleFlip = (card) => {
    if (flipped.length === 2 || flipped.some((f) => f.id === card.id)) return;
    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (newFlipped[0].value === newFlipped[1].value) {
        setMatched((m) => [...m, newFlipped[0].value]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const isGameOver = matched.length === difficulties[mode] / 2;

  useEffect(() => {
    if (isGameOver) {
      setTimerActive(false);
      saveGame();
    }
  }, [isGameOver]);

  const saveGame = async () => {
    const score = Math.max(0, 1000 - (moves * 10 + time));
    try {
      await API.post("/games", { mode, moves, time, score });
    } catch (error) {
      console.error("Error saving game", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-700 bg-[length:200%_200%] animate-gradient-bg p-4 sm:p-6 font-['Bangers']">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-red-500 mb-8 drop-shadow-[0_4px_8px_rgba(255,0,0,0.7)] tracking-wider uppercase animate-glow">
        Memory Card Clash
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border-4 border-red-400 rounded-lg px-4 py-2 bg-black bg-opacity-80 text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-[0_0_10px_rgba(255,0,0,0.5)] text-lg"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy (4x2)</option>
          <option value="medium">Medium (4x4)</option>
          <option value="hard">Hard (8x4)</option>
        </select>
        <button
          onClick={startGame}
          className="bg-red-600 text-white px-6 py-2 rounded-lg border-4 border-red-400 hover:bg-red-700 hover:scale-105 active:scale-95 transition duration-200 shadow-[0_0_15px_rgba(255,0,0,0.7)] text-xl"
        >
          Start Battle
        </button>
      </div>
      <div className="flex gap-6 mb-8 text-lg font-semibold text-red-300">
        <p className="bg-black bg-opacity-80 px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(255,0,0,0.5)]">
          Moves: {moves}
        </p>
        <p className="bg-black bg-opacity-80 px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(255,0,0,0.5)]">
          Time: {time}s
        </p>
      </div>
      <div
        className="grid gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: `repeat(${
            gridColumns[mode] || 4
          }, minmax(0, 80px))`,
          maxWidth: "min(90vw, 800px)",
        }}
      >
        {cards.map((card) => {
          const isFlipped =
            flipped.some((f) => f.id === card.id) ||
            matched.includes(card.value);
          return (
            <div
              key={card.id}
              onClick={() => handleFlip(card)}
              className={`relative w-20 h-20 flex items-center justify-center rounded-lg cursor-pointer text-4xl shadow-[0_0_10px_rgba(255,0,0,0.5)] transform transition-all duration-300 hover:scale-105 ${
                isFlipped ? "bg-red-600" : "bg-black bg-opacity-80"
              }`}
              style={{ perspective: "1000px" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg text-red-300 text-4xl border-2 border-red-400"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  ?
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center bg-red-600 rounded-lg text-white border-2 border-red-400"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {card.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isGameOver && (
        <div className="mt-8 text-2xl font-bold text-red-300 bg-black bg-opacity-80 px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.7)] animate-pulse">
          Victory! Score: {Math.max(0, 1000 - (moves * 10 + time))}
        </div>
      )}
    </div>
  );
};

export default GamePage;
