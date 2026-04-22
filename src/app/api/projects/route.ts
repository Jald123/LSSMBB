import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { CASE_STUDIES } from "@/config/caseStudies";

// GET /api/projects - List all projects for authenticated student
export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const userId = (session as any).id;

        const projects = await prisma.doProject.findMany({
            where: {
                studentId: userId,
                ...(status ? { status } : {})
            },
            select: {
                id: true,
                title: true,
                caseId: true,
                framework: true,
                status: true,
                currentPhase: true,
                progressPercentage: true,
                updatedAt: true
            },
            orderBy: { updatedAt: 'desc' }
        });

        return NextResponse.json({ projects });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/projects - Create a new project
export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { caseId, framework, title } = await request.json();
        const userId = (session as any).id;

        // Find case study details from config
        const caseStudy = CASE_STUDIES.find(c => c.id === caseId);
        if (!caseStudy) {
            return NextResponse.json({ error: "Case study not found" }, { status: 400 });
        }

        const projectTitle = title || caseStudy.title;

        // 1. Create the project
        const project = await prisma.doProject.create({
            data: {
                studentId: userId,
                caseId,
                framework,
                title: projectTitle,
                status: "active",
                currentPhase: caseStudy.phases[0]?.name || "Define",
                progressPercentage: 0
            }
        });

        // 2. Generate auto-records for deliverables
        const deliverablesData = [];
        for (const phase of caseStudy.phases) {
            for (const tool of phase.tools) {
                deliverablesData.push({
                    projectId: project.id,
                    toolId: tool.toolId,
                    phase: phase.name,
                    status: "not-started",
                    priority: tool.priority
                });
            }
        }

        await prisma.doDeliverable.createMany({
            data: deliverablesData
        });

        // 3. Initialize Phase Gates
        const gateData = caseStudy.phases.map((phase, index) => ({
            projectId: project.id,
            phase: phase.name,
            status: index === 0 ? "unlocked" : "locked"
        }));

        await prisma.projectPhaseGate.createMany({
            data: gateData
        });

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Project creation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
