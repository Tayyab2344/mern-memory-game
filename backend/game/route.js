import express from "express";
import { saveGame, getMyGames, getLeaderboard } from "./controller.js";
import { authentication } from "../middleware/middleware.js";

export const gameRouter = express.Router();

gameRouter.post("/", authentication, saveGame);
gameRouter.get("/me", authentication, getMyGames);
gameRouter.get("/leaderboard/:mode", getLeaderboard);
