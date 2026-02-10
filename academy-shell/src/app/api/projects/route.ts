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

        // 1. Fetch the selected framework with all phases AND tool mappings
        const framework = await prisma.framework.findUnique({
            where: { name: frameworkName },
            include: {
                steps: {
                    include: {
                        mappings: {
                            include: {
                                tool: true
                            }
                        }
                    }
                }
            }
        });

        if (!framework) {
            return NextResponse.json({ error: "Framework not found" }, { status: 400 });
        }

        const userId = (session as any).id;

        // 2. Create the Project
        const project = await prisma.project.create({
            data: {
                title,
                userId,
                frameworkId: framework.id,
                caseStudyId: caseStudyId || null,
            }
        });

        // 3. Create Deliverables
        // We loop through EVERY phase in the framework
        for (const phase of framework.steps) {
            // And EVERY tool mapped to that phase
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

        // 4. Initialize Progress tracking
        await prisma.progress.create({
            data: {
                projectId: project.id,
                totalSteps: framework.steps.length,
                completedSteps: 0
            }
        });

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Project creation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
