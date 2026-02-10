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

        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                framework: {
                    include: {
                        steps: {
                            orderBy: { order: 'asc' },
                            include: {
                                mappings: {
                                    include: { tool: true }
                                }
                            }
                        }
                    }
                },
                deliverables: true,
                progress: true,
            }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Map to Kanban format
        const columns = project.framework.steps.map(step => ({
            id: step.id,
            name: step.name,
            tasks: step.mappings.map(mapping => {
                const deliverable = project.deliverables.find(d => d.toolId === mapping.toolId);
                return {
                    id: deliverable?.id || Math.random().toString(),
                    name: mapping.tool.name,
                    status: deliverable?.status || 'NOT_STARTED',
                    toolId: mapping.toolId
                };
            })
        }));

        return NextResponse.json({ project, columns });
    } catch (error) {
        console.error("Fetch project error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
