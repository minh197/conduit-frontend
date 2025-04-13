// Import the cookie serialization utility from the 'cookie' package
import { serialize } from "cookie";

// Define the name of the authentication cookie (must match login cookie name)
const COOKIE_NAME = "authToken";

// Next.js API route handler (req = request, res = response)
export default function handler(req, res) {
  // Ensure we only handle POST requests
  if (req.method !== "POST") {
    // 405 = Method Not Allowed status code
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Create an expired cookie with same settings as original
  const cookie = serialize(
    COOKIE_NAME, // Cookie name to clear
    "", // Empty value to clear content
    {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: process.env.NODE_ENV !== "development", // HTTPS only in production
      sameSite: "lax", // Moderate CSRF protection
      maxAge: -1, // Immediate expiration (invalidates cookie)
      path: "/", // Apply to all paths on the domain
    }
  );

  // Set the 'Set-Cookie' header to remove the client's cookie
  res.setHeader("Set-Cookie", cookie);

  // Send success response with 200 status code
  res.status(200).json({
    message: "Logged out successfully",
  });
}
