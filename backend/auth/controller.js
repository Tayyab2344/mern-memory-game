import User from "./model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await User.create({ name, email, password });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    res.status(201).json({
      message: "New user created successfully",
      status: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gamesPlayed: newUser.gamesPlayed,
        bestScoreEasy: newUser.bestScoreEasy,
        bestScoreMedium: newUser.bestScoreMedium,
        bestScoreHard: newUser.bestScoreHard,
      },
      token,
    });
  } catch (error) {
    console.log("Signup error:", error.message);
    res
      .status(500)
      .json({ message: "Error during signup", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "Invalid credentials", status: false });
    }

    const passwordMatch = await foundUser.comparePassword(password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: false });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      status: true,
      token,
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        gamesPlayed: foundUser.gamesPlayed,
        bestScoreEasy: foundUser.bestScoreEasy,
        bestScoreMedium: foundUser.bestScoreMedium,
        bestScoreHard: foundUser.bestScoreHard,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while login", error: error.message });
  }
};
