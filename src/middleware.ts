import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Convert the JWT secret to a Uint8Array for jose
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Middleware to protect routes by verifying JWT stored in cookies.
 */
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow public paths: login page, static assets, API routes
    const publicPaths = ["/login", "/_next", "/api", "/icons", "/backgrounds"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Get token from cookies
    const token = req.cookies.get("token")?.value;

    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Verify JWT
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.next();
    } catch (err) {
        console.log("Token verification failed:", err);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
