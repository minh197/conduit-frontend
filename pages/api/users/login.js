import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
const COOKIE_NAME = "authToken";
const JWT_SECRET = process.env.JWT_SECRET;

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

    const token = jwt.sign(
      {
        id: userFromDB.id,
        email: userFromDB.email,
        username: userFromDB.username,
      }, // Include necessary non-sensitive data
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // --- Set HttpOnly Cookie ---
    const cookie = serialize(COOKIE_NAME, token, {
      httpOnly: true, // Essential for security
      secure: process.env.NODE_ENV !== "development", // Use secure in production (HTTPS)
      sameSite: "lax", // Mitigates CSRF
      maxAge: 60 * 60 * 24, // 1 day (matches token expiry)
      path: "/", // Cookie available across the entire site
    });
    res.setHeader("Set-Cookie", cookie);
    // --- /Set HttpOnly Cookie ---

    // Return user data *without* the token in the body
    res.status(200).json({
      user: {
        email: userFromDB.email,
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
