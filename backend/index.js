import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import { authRouter } from "./auth/route.js";
import { gameRouter } from "./game/route.js";
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/games", gameRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
