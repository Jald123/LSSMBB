import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { CASE_STUDIES } from "@/config/caseStudies";

// PUT /api/projects/{id}/deliverables/{toolId}/complete
export async function PUT(
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
        const { data, phase } = body;
        const userId = (session as any).id;

        // 1. Verify ownership
        const project = await prisma.doProject.findUnique({
            where: { id }
        });

        if (!project || project.studentId !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Mark deliverable as COMPLETE
        const deliverable = await prisma.doDeliverable.findFirst({
            where: { projectId: id, toolId: toolId }
        });

        if (!deliverable) {
            return NextResponse.json({ error: "Deliverable not found" }, { status: 404 });
        }

        await prisma.doDeliverable.update({
            where: { id: deliverable.id },
            data: {
                formData: data,
                status: 'complete',
                completedAt: new Date(),
                updatedAt: new Date()
            }
        });

        // 3. Recalculate progress
        await updateProjectProgress(id);

        // 4. Phase Gate Logic
        const caseStudy = CASE_STUDIES.find(c => c.id === project.caseId);
        if (!caseStudy) return NextResponse.json({ success: true });

        const currentPhaseName = deliverable.phase;
        const phaseIndex = caseStudy.phases.findIndex(p => p.name === currentPhaseName);

        // Check if all essential tools in THIS phase are complete
        const phaseDeliverables = await prisma.doDeliverable.findMany({
            where: { projectId: id, phase: currentPhaseName }
        });

        const essentialToolsInPhase = phaseDeliverables.filter((d: any) => d.priority === 'essential');
        const allEssentialComplete = essentialToolsInPhase.every((d: any) => d.status === 'complete');

        let phaseGateUnlocked = false;
        let nextPhaseName = null;

        if (allEssentialComplete) {
            // Mark current phase gate as completed
            await prisma.projectPhaseGate.updateMany({
                where: { projectId: id, phase: currentPhaseName },
                data: { status: 'completed', completedAt: new Date() }
            });

            // Unlock next phase if exists
            if (phaseIndex < caseStudy.phases.length - 1) {
                const nextPhase = caseStudy.phases[phaseIndex + 1];
                nextPhaseName = nextPhase.name;

                const nextGate = await prisma.projectPhaseGate.findFirst({
                    where: { projectId: id, phase: nextPhaseName }
                });

                if (nextGate && nextGate.status === 'locked') {
                    await prisma.projectPhaseGate.update({
                        where: { id: nextGate.id },
                        data: { status: 'unlocked', unlockedAt: new Date() }
                    });
                    phaseGateUnlocked = true;

                    // Update project current phase
                    await prisma.doProject.update({
                        where: { id },
                        data: { currentPhase: nextPhaseName }
                    });
                }
            }
        }

        return NextResponse.json({
            success: true,
            phaseGateUnlocked,
            nextPhase: nextPhaseName
        });

    } catch (error) {
        console.error("Complete deliverable error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

async function updateProjectProgress(projectId: string) {
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
