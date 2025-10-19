import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
    console.log("Middleware hit:", req.nextUrl.pathname);
    const url = req.nextUrl.clone();

    // Allow static and auth paths
    if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api") || url.pathname.startsWith("/public") || url.pathname === "/login") {
        return NextResponse.next();
    }

    const cookie = req.cookies.get("app_token")?.value;

    console.log("Cookie found:", cookie);

    if (!cookie) {
        // if no server cookie then redirect to login
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    try {
        jwt.verify(cookie, JWT_SECRET);
        return NextResponse.next();
    } catch (err) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
}

/*
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"]
}
*/
