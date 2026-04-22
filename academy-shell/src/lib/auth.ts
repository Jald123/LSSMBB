import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "nexus-super-secret-key-2026";

export function signToken(payload: Record<string, string | number | boolean>) {
    return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export async function getSession() {
    const token = (await cookies()).get("nexus-session")?.value;
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET);
    } catch (e) {
        return null;
    }
}
