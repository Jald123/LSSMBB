import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "nexus-academy-token-secret-2026-production"
);

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("nexus-session")?.value;

    const isAuthPage = request.nextUrl.pathname.startsWith("/login");
    const isApiAuth = request.nextUrl.pathname.startsWith("/api/auth");

    if (isAuthPage) {
        if (token) {
            try {
                await jose.jwtVerify(token, SECRET);
                return NextResponse.redirect(new URL("/", request.url));
            } catch (e) {
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    if (isApiAuth) return NextResponse.next();

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const { payload } = await jose.jwtVerify(token, SECRET);

        // Admin only check
        if (request.nextUrl.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|manifest.json|assets|api/auth).*)",
    ],
};
