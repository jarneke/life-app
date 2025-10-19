import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const APP_PASSWORD = process.env.APP_PASSWORD!;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30d";
const OFFLINE_EXPIRES_IN = process.env.OFFLINE_JWT_EXPIRES_IN || "7d";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();
    const { password } = req.body || {};

    if (!password || password !== APP_PASSWORD) {
        return res.status(401).json({ ok: false });
    }

    const payload = { sub: "owner" }; // minimal payload
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // httpOnly cookie (server-validated session)
    res.setHeader("Set-Cookie", serialize("app_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days (align with JWT_EXPIRES_IN)
    }));

    // offlineToken is returned to client so it can store in localStorage for offline use
    const offlineToken = jwt.sign({ sub: "owner", offline: true }, JWT_SECRET, { expiresIn: OFFLINE_EXPIRES_IN });

    res.status(200).json({ ok: true, offlineToken });
}
