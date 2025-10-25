import type { NextApiRequest, NextApiResponse } from "next";

// Logout API route — clears the JWT cookie to log the user out
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // ---------- CLEAR COOKIE ----------
    res.setHeader(
        "Set-Cookie",
        "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict"
    );

    // ---------- RESPONSE ----------
    res.status(200).json({ success: true });
}
