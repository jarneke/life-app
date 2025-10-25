import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const APP_PASSWORD = process.env.APP_PASSWORD!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3600000";

// Login API route — verifies app password and returns a JWT in an HttpOnly cookie
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // ---------- METHOD CHECK ----------
    if (req.method !== "POST") return res.status(405).end();

    // ---------- EXTRACT BODY ----------
    const { username, password } = req.body;

    // ---------- AUTHENTICATION ----------
    if (password && `${password}`.trim() === `${APP_PASSWORD}`.trim()) {
        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET);

        // Set HttpOnly cookie with JWT
        res.setHeader(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=${JWT_EXPIRES_IN}; SameSite=Strict`
        );

        // Return success response
        return res.status(200).json({ success: true, password: password, app_password: APP_PASSWORD });
    }

    // ---------- UNAUTHORIZED ----------
    res.status(401).json({ success: false });
}
