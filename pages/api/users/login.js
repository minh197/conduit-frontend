import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body.user;

  try {
    const userFromDB = await prisma.user.findUnique({
      where: { email },
    });

    if (!userFromDB) {
      return res
        .status(401)
        .json({ errors: { body: ["Invalid credentials"] } });
    }

    const isValid = await bcrypt.compare(password, userFromDB.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ errors: { body: ["Invalid credentials"] } });
    }

    const token = jwt.sign({ id: userFromDB.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      user: {
        email: userFromDB.email,
        token,
        username: userFromDB.username,
        bio: userFromDB.bio,
        image: userFromDB.image,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ errors: { body: ["Server error"] } });
  }
}
