import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
    const session = await getSession();

    if (!session || typeof session === 'string') {
        return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
        where: { id: (session as any).id },
        select: { id: true, email: true, role: true, name: true }
    });

    return NextResponse.json({ user });
}
