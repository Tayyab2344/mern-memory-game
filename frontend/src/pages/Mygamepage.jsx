import { useEffect, useState } from "react";
import API from "../components/api/api";

const MyGamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyGames = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/games/me");
      setGames(data.games);
    } catch (error) {
      console.error(
        "Error fetching my games",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGames();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-700 bg-[length:200%_200%] animate-gradient-bg p-4 sm:p-6 font-sans">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-red-500 mb-8 drop-shadow-[0_4px_8px_rgba(255,0,0,0.7)] tracking-wider uppercase font-['Bangers'] animate-glow">
        My Games
      </h1>

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-4 text-xl text-red-400 font-bold font-['Bangers']">
            Loading your battles...
          </p>
        </div>
      ) : games.length === 0 ? (
        <p className="text-2xl text-red-400 font-bold font-['Bangers'] drop-shadow-md">
          No battles found. Charge into the game!
        </p>
      ) : (
        <div className="w-full max-w-5xl overflow-x-auto rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.8)]">
          <table className="min-w-full table-auto bg-black bg-opacity-80 divide-y divide-red-700">
            <thead className="bg-red-900 text-red-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider font-['Bangers']">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider font-['Bangers']">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider font-['Bangers']">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider font-['Bangers']">
                  Moves
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider font-['Bangers']">
                  Time (s)
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider font-['Bangers']">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-700">
              {games.map((game, index) => (
                <tr
                  key={game._id}
                  className={`hover:bg-red-800 hover:bg-opacity-50 transition duration-200 text-red-200 ${
                    index % 2 === 0
                      ? "bg-black bg-opacity-50"
                      : "bg-red-900 bg-opacity-20"
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold capitalize">
                    {game.mode}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {game.score}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {game.moves}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {game.time}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {new Date(game.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGamesPage;
