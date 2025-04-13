// Import Next.js server utilities
import { NextResponse } from "next/server";
// JWT verification library (edge-compatible)
import { jwtVerify } from "jose";

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
// Cookie name must match login/logout implementation
const COOKIE_NAME = "authToken";

// Helper function to encode secret key for JWT verification
async function getKey(secret) {
  return new TextEncoder().encode(secret);
}

// Main middleware function
export async function middleware(request) {
  // Get current URL path
  const { pathname } = request.nextUrl;

  // 1. Extract authentication token from cookies
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // 2. Define unprotected routes (accessible without auth)
  const publicPaths = [
    "/login", // Login page
    "/register", // Registration page
    "/api/users/login", // Login API endpoint
    "/api/users", // User registration API,

  ];

  // Check if current path starts with any public path
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  let userPayload = null; // Will store decoded JWT if valid

  // 3. Verify token only if it exists and secret is configured
  if (token && JWT_SECRET) {
    try {
      // Verify JWT using secret key
      const { payload } = await jwtVerify(token, await getKey(JWT_SECRET));
      userPayload = payload; // Store user data from token
    } catch (err) {
      // Log verification errors but continue as unauthenticated
      console.error("JWT Verification Error:", err);
    }
  }
  console.log("userpayload", userPayload)
  console.log("ispublic", isPublicPath);

  // 4. Redirect unauthenticated users from protected pages
  if (!userPayload && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    // Preserve original destination for post-login redirect
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Redirect authenticated users away from auth pages
  if (userPayload && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/editor", request.url));
  }

  // 6. Allow request to proceed normally
  return NextResponse.next();
}

// Middleware configuration - specify protected paths
export const config = {
  matcher: [
    /*
     * Protect all routes EXCEPT:
     * - Public API routes
     * - Next.js internal paths
     * - Static files
     */
    "/editor/:path*",
    "/((?!api/public|api/auth/callback|_next/static|_next/image|favicon.ico).*)",
  ],
};
