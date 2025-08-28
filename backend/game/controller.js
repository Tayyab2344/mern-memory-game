import Game from "./model.js";
import User from "../auth/model.js";

export const saveGame = async (req, res) => {
  try {
    const { mode, moves, time, score } = req.body;

    if (!mode || !moves || !time || !score) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const game = await Game.create({
      user: req.user.id,
      mode,
      moves,
      time,
      score,
    });

    const user = await User.findById(req.user.id);
    user.gamesPlayed += 1;

    if (mode === "easy" && score > user.bestScoreEasy) {
      user.bestScoreEasy = score;
    }
    if (mode === "medium" && score > user.bestScoreMedium) {
      user.bestScoreMedium = score;
    }
    if (mode === "hard" && score > user.bestScoreHard) {
      user.bestScoreHard = score;
    }

    await user.save();

    res.status(201).json({ message: "Game saved successfully", game });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving game", error: error.message });
  }
};

export const getMyGames = async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ games });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching games", error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { mode } = req.params;

    const leaderboard = await Game.aggregate([
      { $match: { mode } },
      { $sort: { score: -1, time: 1, moves: 1 } },
      {
        $group: {
          _id: { $ifNull: ["$user", null] },
          bestGame: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          userDetails: { $arrayElemAt: ["$userDetails", 0] },
        },
      },
      {
        $project: {
          _id: 0,
          user: {
            name: { $ifNull: ["$userDetails.name", "Anonymous"] },
          },
          score: "$bestGame.score",
          time: "$bestGame.time",
          moves: "$bestGame.moves",
        },
      },
      { $sort: { score: -1, time: 1, moves: 1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({ leaderboard });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leaderboard", error: error.message });
  }
};
