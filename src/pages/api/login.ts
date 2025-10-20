import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const APP_PASSWORD = process.env.APP_PASSWORD!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3600000";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { username, password } = req.body;
    console.log('pass: ', `${password}`);
    console.log('ap p: ', `${APP_PASSWORD}`);

    if (password && `${password}`.trim() === `${APP_PASSWORD}`.trim()) {
        console.log("secret when setting", JWT_SECRET);


        const token = jwt.sign({ username }, JWT_SECRET);

        res.setHeader(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=${JWT_EXPIRES_IN}; SameSite=Strict`
        );

        return res.status(200).json({ success: true, password: password, app_password: APP_PASSWORD });
    }

    res.status(401).json({ success: false });
}