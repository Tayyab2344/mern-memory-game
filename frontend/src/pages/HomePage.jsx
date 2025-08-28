import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-700 bg-[length:200%_200%] animate-gradient-bg">
      <div className="text-center relative">
        <h1 className="text-6xl md:text-8xl font-extrabold text-red-500 mb-8 drop-shadow-[0_4px_8px_rgba(255,0,0,0.7)] tracking-wider uppercase font-['Bangers'] animate-glow">
          Memory Game
        </h1>
        <button
          onClick={() => navigate("/game")}
          className="px-12 py-6 rounded-lg text-3xl font-bold text-white bg-red-600 border-4 border-red-400 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,0,0,0.8)] animate-pulse font-['Bangers']"
        >
          Smash to Start
        </button>
      </div>
    </div>
  );
};

export default HomePage;
