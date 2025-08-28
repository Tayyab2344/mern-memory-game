import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mode: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    moves: {
      type: Number,
      required: true,
    },
    time: {
      type: Number, 
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;
