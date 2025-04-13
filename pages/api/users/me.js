// Import Prisma client for database operations
import { PrismaClient } from "@prisma/client";
// JWT library for token verification
import jwt from "jsonwebtoken"; // Consider using jose for edge compatibility if needed

// Initialize Prisma client instance
const prisma = new PrismaClient();
// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
// Cookie name must match other auth endpoints
const COOKIE_NAME = "authToken";

// API route handler for user authentication check
export default async function handler(req, res) {
  // Only allow GET requests for this endpoint
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" }); // 405 = Method Not Allowed
  }

  try {
    // 1. Extract JWT token from cookies
    const token = req.cookies[COOKIE_NAME];

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" }); // 401 = Unauthorized
    }

    // 3. Verify and decode JWT token
    const decoded = jwt.verify(token, JWT_SECRET); // Throws error if invalid
    const userId = decoded.id; // Extract user ID from token payload

    // 4. Fetch user from database using Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId }, // Search by user ID from token
      select: {
        // Security: Only expose necessary fields
        id: true,
        email: true,
        username: true,
        bio: true,
        bio: true,
        image: true,
      },
    });

    // 5. Handle missing user scenario
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // 404 = Not Found
    }

    // 6. Return user data to client
    res.status(200).json({ user }); // 200 = Success
  } catch (error) {
    console.error("Me API error:", error);

    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Expired token" });
    }

    // Generic server error for other exceptions
    res.status(500).json({ error: "Server error" }); // 500 = Internal Server Error
  }
}
