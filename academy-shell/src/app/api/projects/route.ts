import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
    const cases = await prisma.caseStudy.findMany();
    const frameworks = await prisma.framework.findMany({
        include: { steps: true }
    });
    return NextResponse.json({ cases, frameworks });
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, caseStudyId, frameworkName } = await request.json();

        const framework = await prisma.framework.findUnique({
            where: { name: frameworkName },
            include: { steps: { include: { mappings: { include: { tool: true } } } } }
        });

        if (!framework) {
            return NextResponse.json({ error: "Framework not found" }, { status: 400 });
        }

        const userId = (session as any).id;

        // 1. Create Project
        const project = await prisma.project.create({
            data: {
                title,
                userId,
                frameworkId: framework.id,
                caseStudyId: caseStudyId || null,
            }
        });

        // 2. Create Deliverables based on Framework Tools
        for (const phase of framework.steps) {
            for (const mapping of phase.mappings) {
                await prisma.deliverable.create({
                    data: {
                        projectId: project.id,
                        toolId: mapping.toolId,
                        status: "NOT_STARTED",
                    }
                });
            }
        }

        // 3. Initialize Progress
        const totalSteps = framework.steps.length;
        await prisma.progress.create({
            data: {
                projectId: project.id,
                totalSteps,
            }
        });

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Project creation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
