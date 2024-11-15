import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import dotenv from 'dotenv'

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret)
const jwtExpiration = process.env.JWT_EXPIRATION || "365d";

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: jwtExpiration,
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user.userId;

    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const token = jwt.sign({ userId: user }, jwtSecret, {
      expiresIn: jwtExpiration,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default login;
