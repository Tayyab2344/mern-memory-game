import { useEffect, useState } from "react";
import API from "../components/api/api";

const LeaderboardPage = () => {
  const [mode, setMode] = useState("easy");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async (selectedMode) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/games/leaderboard/${selectedMode}`);

      const uniquePlayers = {};
      data.leaderboard.forEach((game) => {
        const playerName = game.user?.name || "Anonymous";

        if (!uniquePlayers[playerName]) {
          uniquePlayers[playerName] = game;
        } else {
          const existing = uniquePlayers[playerName];
          if (
            game.score > existing.score ||
            (game.score === existing.score && game.time < existing.time)
          ) {
            uniquePlayers[playerName] = game;
          }
        }
      });

      const filteredLeaderboard = Object.values(uniquePlayers).sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.time !== b.time) return a.time - b.time;
        return a.moves - b.moves;
      });

      setLeaderboard(filteredLeaderboard);
    } catch (error) {
      console.error(
        "Error fetching leaderboard",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(mode);
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-700 bg-[length:200%_200%] animate-gradient-bg p-4 sm:p-6 font-['Bangers']">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-red-500 mb-8 drop-shadow-[0_4px_8px_rgba(255,0,0,0.7)] tracking-wider uppercase animate-glow">
        Epic Leaderboard
      </h1>

      <div className="mb-8">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border-4 border-red-400 rounded-lg px-4 py-2 bg-black bg-opacity-80 text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-[0_0_10px_rgba(255,0,0,0.5)] text-lg"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-4 text-lg text-red-300">Loading leaderboard...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.7)]">
          <table className="min-w-full table-auto bg-black bg-opacity-80 divide-y divide-red-400">
            <thead className="bg-red-900">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-red-300">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-red-300">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-red-300">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-red-300">
                  Moves
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-red-300">
                  Time (s)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-400">
              {leaderboard.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-red-300"
                  >
                    No games yet.
                  </td>
                </tr>
              ) : (
                leaderboard.map((game, index) => (
                  <tr
                    key={game._id}
                    className={`hover:bg-red-800/50 transition duration-200 ${
                      index % 2 === 0
                        ? "bg-black bg-opacity-90"
                        : "bg-red-900/20"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-red-500 font-bold">
                      {index === 0
                        ? "🏆"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-300">
                      {game.user?.name || "Anonymous"}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-300">
                      {game.score}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-300">
                      {game.moves}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-300">
                      {game.time}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
