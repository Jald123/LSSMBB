const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 STARTING NEXUS OS ACADEMY SEED PROCESS...");

    const hashedPassword = await bcrypt.hash("Nexus123!", 10);

    // 1. Users
    const users = [
        { email: "admin@nexus.os", name: "Master Admin", role: "ADMIN" },
        { email: "student@nexus.os", name: "Alpha Student", role: "STUDENT" },
        { email: "trial@nexus.os", name: "Guest User", role: "TRIAL" },
    ];

    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                ...u,
                passwordHash: hashedPassword,
            },
        });
    }

    // 2. Frameworks
    const frameworks = [
        { id: "dmaic", name: "DMAIC", steps: ["Define", "Measure", "Analyze", "Improve", "Control"] },
        { id: "dmadv", name: "DMADV", steps: ["Define", "Measure", "Analyze", "Design", "Verify"] },
        { id: "kaizen", name: "Kaizen", steps: ["Observe & Plan", "Improve", "Standardize"] },
        { id: "pdca", name: "PDCA", steps: ["Plan", "Do", "Check", "Act"] },
        { id: "focus-pdca", name: "FOCUS-PDCA", steps: ["Find", "Organize", "Clarify", "Understand", "Select", "Plan", "Do", "Check", "Act"] },
    ];

    for (const f of frameworks) {
        const fw = await prisma.framework.upsert({
            where: { name: f.name },
            update: {},
            create: { name: f.name, description: `${f.name} Improvement Framework` },
        });

        for (let i = 0; i < f.steps.length; i++) {
            await prisma.phase.create({
                data: {
                    name: f.steps[i],
                    order: i,
                    frameworkId: fw.id,
                },
            });
        }
    }

    // 3. Tools (Representative subset)
    const tools = [
        { name: "Project Charter", category: "PLAN" },
        { name: "SIPOC", category: "PLAN" },
        { name: "VOC Analysis", category: "PLAN" },
        { name: "MSA", category: "MEASURE" },
        { name: "Capability Analysis", category: "MEASURE" },
        { name: "Fishbone Diagram", category: "ANALYZE" },
        { name: "5 Whys", category: "ANALYZE" },
        { name: "Pareto Chart", category: "ANALYZE" },
        { name: "FMEA", category: "IMPROVE" },
        { name: "Control Plan", category: "CONTROL" },
    ];

    for (const t of tools) {
        await prisma.tool.upsert({
            where: { name: t.name },
            update: {},
            create: t,
        });
    }

    // 4. Case Studies
    const cases = [
        { title: "ER Wait Times", category: "MEDICAL", difficulty: 4 },
        { title: "Medication Errors", category: "MEDICAL", difficulty: 5 },
        { title: "Patient Safe-Transfer", category: "MEDICAL", difficulty: 3 },
        { title: "Surgical Path Optimization", category: "MEDICAL", difficulty: 4 },
        { title: "Lab Results TAT", category: "MEDICAL", difficulty: 3 },
        { title: "Smart Grocery Shopping", category: "DAILY_LIFE", difficulty: 1 },
        { title: "Morning Routine Lean", category: "DAILY_LIFE", difficulty: 2 },
        { title: "Portfolio Rebalancing", category: "INVESTMENT", difficulty: 4 },
        { title: "Risk Mitigation Strategy", category: "INVESTMENT", difficulty: 5 },
        { title: "Property Yield Analysis", category: "INVESTMENT", difficulty: 4 },
    ];

    for (const c of cases) {
        await prisma.caseStudy.create({ data: c });
    }

    console.log("\n✅ SEEDING COMPLETE");
    console.log("\n------------------------------------------------");
    console.log("CREDENTIALS (DEMO):");
    console.log("ADMIN:   admin@nexus.os   / Nexus123!");
    console.log("STUDENT: student@nexus.os / Nexus123!");
    console.log("TRIAL:   trial@nexus.os   / Nexus123!");
    console.log("------------------------------------------------\n");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
