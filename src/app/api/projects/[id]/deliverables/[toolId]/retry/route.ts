import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// POST /api/projects/{id}/deliverables/{toolId}/retry
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string; toolId: string }> }
) {
    try {
        const session = await getSession();
        if (!session || typeof session === 'string') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, toolId } = await params;
        const userId = (session as any).id;

        // 1. Verify ownership
        const project = await prisma.doProject.findUnique({
            where: { id: id }
        });

        if (!project || project.studentId !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Find deliverable
        const deliverable: any = await prisma.doDeliverable.findFirst({
            where: {
                projectId: id,
                toolId: toolId
            }
        });

        if (!deliverable) {
            return NextResponse.json({ error: "Deliverable not found" }, { status: 404 });
        }

        // 3. Increment attempts (No maximum enforced)

        // 4. Archive current attempt to history
        const retryHistory = Array.isArray(deliverable.retryHistory) 
            ? [...(deliverable.retryHistory as any[])] 
            : [];
        
        retryHistory.push({
            attempt: deliverable.attempts,
            formData: deliverable.formData,
            score: deliverable.score,
            feedback: deliverable.feedback,
            completedAt: deliverable.completedAt,
            archivedAt: new Date()
        });

        // 5. Reset for next attempt
        await (prisma.doDeliverable as any).update({
            where: { id: deliverable.id },
            data: {
                status: 'in-progress',
                attempts: {
                    increment: 1
                },
                retryHistory: retryHistory,
                // We keep formData unless the user wants to start from scratch. 
                // Usually it's better to let them edit what they had.
                updatedAt: new Date()
            }
        });

        return NextResponse.json({ 
            success: true, 
            attemptsLeft: 999 // Unlimited
        });

    } catch (error) {
        console.error("Retry deliverable error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
