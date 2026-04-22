import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const projects = await prisma.project.findMany({
            where: { userId },
            include: {
                framework: true,
                caseStudy: true,
                progress: true
            },
            orderBy: { updatedAt: 'desc' }
        });
        return NextResponse.json({ projects });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
