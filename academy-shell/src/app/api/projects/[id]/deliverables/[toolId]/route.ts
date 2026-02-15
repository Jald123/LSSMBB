import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// GET /api/projects/{id}/deliverables/{toolId}
export async function GET(
    request: Request,
    { params }: { params: { id: string; toolId: string } }
) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, toolId } = await params;
        const userId = (session as any).id;

        // Verify project ownership
        const project = await prisma.doProject.findUnique({
            where: { id: id }
        });

        if (!project || project.studentId !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const deliverable = await prisma.doDeliverable.findFirst({
            where: {
                projectId: id,
                toolId: toolId
            }
        });

        if (!deliverable) {
            return NextResponse.json({ deliverable: null });
        }

        return NextResponse.json({
            status: deliverable.status,
            formData: deliverable.formData,
            lastSaved: deliverable.updatedAt
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/projects/{id}/deliverables/{toolId} - Save/Update deliverable
export async function POST(
    request: Request,
    { params }: { params: { id: string; toolId: string } }
) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, toolId } = await params;
        const body = await request.json();
        const { data } = body;
        const userId = (session as any).id;

        // 1. Verify ownership
        const project = await prisma.doProject.findUnique({
            where: { id }
        });

        if (!project || project.studentId !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Find and update deliverable
        const deliverable = await prisma.doDeliverable.findFirst({
            where: { projectId: id, toolId: toolId }
        });

        if (!deliverable) {
            return NextResponse.json({ error: "Deliverable record not found" }, { status: 404 });
        }

        const newStatus = deliverable.status === 'not-started' ? 'in-progress' : deliverable.status;

        await prisma.doDeliverable.update({
            where: { id: deliverable.id },
            data: {
                formData: data,
                status: newStatus,
                updatedAt: new Date()
            }
        });

        // 3. Update project metadata
        await prisma.doProject.update({
            where: { id },
            data: { updatedAt: new Date() }
        });

        // 4. Recalculate Progress
        await updateProjectProgress(id);

        return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
    } catch (error) {
        console.error("Save deliverable error:", error);
        return NextResponse.json({ error: "Failed to save deliverable" }, { status: 500 });
    }
}

async function updateProjectProgress(projectId: string) {
    // Count completed deliverables that are essential or recommended
    const deliverables = await prisma.doDeliverable.findMany({
        where: { projectId }
    });

    const relevantTools = deliverables.filter((d: any) => d.priority === 'essential' || d.priority === 'recommended');
    if (relevantTools.length === 0) return;

    const completedTools = relevantTools.filter((d: any) => d.status === 'complete').length;
    const percentage = Math.round((completedTools / relevantTools.length) * 100);

    await prisma.doProject.update({
        where: { id: projectId },
        data: { progressPercentage: percentage }
    });
}
