import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwt.js";
import prisma from "../config/db.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });
    if (!user) {
      throw new Error("User not Found");
    }
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
