import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, email, password } = req.body.user;

  if (!username || !email || !password) {
    return res
      .status(422)
      .json({ errors: { body: ["Missing required fields"] } });
  }

  try {
    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
     if (existingUser) {
       return res.status(409).json({
         errors: { body: ["Username or email already exists"] },
       });
     }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Create a JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      user: {
        email: newUser.email,
        token,
        username: newUser.username,
        bio: newUser.bio,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ errors: { body: ["Server error"] } });
  }
}
