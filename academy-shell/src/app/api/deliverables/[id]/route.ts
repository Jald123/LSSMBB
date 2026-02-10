import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const deliverable = await prisma.deliverable.findUnique({
            where: { id }
        });

        return NextResponse.json({ deliverable });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { content, status } = await request.json();

        const deliverable = await prisma.deliverable.update({
            where: { id },
            data: {
                content: content !== undefined ? content : undefined,
                status: status !== undefined ? status : undefined,
                version: { increment: 1 }
            }
        });

        return NextResponse.json({ deliverable });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
