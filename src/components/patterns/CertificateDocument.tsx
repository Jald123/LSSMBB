// @ts-nocheck
"use client";

import React from "react";
// @ts-ignore
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
    Svg,
    Path,
    Circle
} from "@react-pdf/renderer";

// ─── FONT REGISTRATION ─────────────────────────────────
// Registering Google Fonts for world-class typography
Font.register({
    family: "DM Sans",
    src: "https://fonts.gstatic.com/s/dmsans/v11/rP2Fp2K8yuW8beBCeAI6TQ.ttf",
    fontWeight: "bold",
});
Font.register({
    family: "DM Sans Medium",
    src: "https://fonts.gstatic.com/s/dmsans/v11/rP2Cp2K8yuW8beBCeApxV07GCXY.ttf",
    fontWeight: "medium",
});
Font.register({
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf",
    fontWeight: "normal",
});
Font.register({
    family: "Inter Bold",
    src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFufAZ9hjp-Ek-_EeA.ttf",
    fontWeight: "bold",
});

// ─── TYPES ──────────────────────────────────────────────
export interface CertificateData {
    recipientName: string;
    beltLevel: "White" | "Yellow" | "Green" | "Black" | "Master Black";
    completionDate: string;
    projectTitle?: string;
    overallScore?: number;
    instructorName?: string;
    certificateId?: string;
}

// ─── DESIGN SYSTEM ─────────────────────────────────────
const BASE_COLORS = {
    background: "#050A10",
    textPrimary: "#F5F7FA",
    textSecondary: "#8D99A7",
    borderSubtle: "#1B2835",
};

const BELT_ACCENTS: Record<string, { primary: string; secondary: string; impact: string }> = {
    White: { 
        primary: "#D9E2EC", 
        secondary: "#9FB3C8",
        impact: "demonstrating foundational awareness of Lean Six Sigma principles, basic LSS vocabulary, and core concepts of operational excellence."
    },
    Yellow: { 
        primary: "#FFC857", 
        secondary: "#D89C1E",
        impact: "demonstrating competency in team participation, fundamental improvement tools, and supporting DMAIC project execution."
    },
    Green: { 
        primary: "#00C853", 
        secondary: "#008C3A",
        impact: "demonstrating competency in DMAIC, problem solving, statistical thinking, and leading data-driven improvement projects that deliver measurable gains in quality, cost, and throughput."
    },
    Black: { 
        primary: "#C6A667", 
        secondary: "#455A64", // Using gold for premium feel per suggestions
        impact: "demonstrating mastery of advanced analytics, change leadership, and executing cross-functional improvement initiatives that deliver high-scale strategic impact."
    },
    "Master Black": { 
        primary: "#C6A667", 
        secondary: "#455A64",
        impact: "demonstrating global mastery of operational excellence strategy, mentoring Black Belts, and guiding enterprise-wide cultural transformation through data science and strategic design."
    },
};

// ─── STYLES ─────────────────────────────────────────────
const styles = StyleSheet.create({
    page: {
        backgroundColor: BASE_COLORS.background,
        padding: 0,
        fontFamily: "Inter",
        position: "relative",
    },
    // Top accent bar
    topAccentBar: {
        height: 5,
        width: "100%",
        position: "absolute",
        top: 0,
    },
    // Main Container
    container: {
        padding: 40,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
    },
    // Header
    header: {
        alignItems: "center",
        marginTop: 10,
    },
    divisionLabel: {
        fontSize: 8,
        color: BASE_COLORS.textSecondary,
        fontFamily: "DM Sans",
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 5,
    },
    academyName: {
        fontSize: 28,
        color: BASE_COLORS.textPrimary,
        fontFamily: "DM Sans",
        fontWeight: "bold",
        letterSpacing: 4,
        textTransform: "uppercase",
    },
    // Body
    body: {
        width: "100%",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    certOfAchievement: {
        fontSize: 18,
        fontFamily: "DM Sans",
        fontWeight: "bold",
        color: BASE_COLORS.textPrimary,
        letterSpacing: 3,
        textTransform: "uppercase",
        marginBottom: 4,
    },
    certSubline: {
        fontSize: 10,
        color: BASE_COLORS.textSecondary,
        letterSpacing: 1,
        marginBottom: 24,
    },
    certifyThat: {
        fontSize: 9,
        color: BASE_COLORS.textSecondary,
        letterSpacing: 5,
        textTransform: "uppercase",
        marginBottom: 15,
    },
    learnerName: {
        fontSize: 38,
        fontFamily: "Inter Bold",
        color: BASE_COLORS.textPrimary,
        marginBottom: 5,
    },
    nameUnderline: {
        width: 320,
        height: 1,
        marginBottom: 15,
    },
    beltPill: {
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 20,
    },
    beltPillText: {
        fontSize: 14,
        fontFamily: "DM Sans",
        fontWeight: "bold",
        color: BASE_COLORS.background,
        letterSpacing: 2,
        textTransform: "uppercase",
    },
    narrativeBox: {
        width: 520,
        alignItems: "center",
    },
    narrativeText: {
        fontSize: 10.5,
        color: BASE_COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 1.6,
    },
    // Corner Elements
    cornerElement: {
        position: "absolute",
        width: 15,
        height: 15,
        borderWidth: 1.5,
        opacity: 0.2,
    },
    topLeft: { top: 20, left: 20, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 20, right: 20, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 20, left: 20, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 20, right: 20, borderLeftWidth: 0, borderTopWidth: 0 },
    // Bottom Details Grid
    footerGrid: {
        width: "100%",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: BASE_COLORS.borderSubtle,
        paddingTop: 20,
        marginTop: 20,
    },
    gridColumn: {
        flex: 1,
        alignItems: "flex-start",
    },
    gridColumnCenter: {
        flex: 1,
        alignItems: "center",
    },
    gridColumnRight: {
        flex: 1,
        alignItems: "flex-end",
    },
    columnLabel: {
        fontSize: 8,
        fontFamily: "DM Sans",
        fontWeight: "bold",
        color: BASE_COLORS.textSecondary,
        textTransform: "uppercase",
        marginBottom: 4,
    },
    columnValue: {
        fontSize: 11,
        color: BASE_COLORS.textPrimary,
        fontFamily: "Inter Bold",
    },
    scoreValue: {
        fontSize: 24,
        fontFamily: "DM Sans",
        fontWeight: "bold",
        color: BASE_COLORS.textPrimary,
    },
    scoreUnit: {
        fontSize: 10,
        color: BASE_COLORS.textSecondary,
        fontFamily: "Inter",
    },
    verifySubtext: {
        fontSize: 7,
        color: BASE_COLORS.textSecondary,
        marginTop: 4,
    },
    // Signatures
    signatureContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 60,
        marginBottom: 10,
    },
    sigBlock: {
        alignItems: "center",
        width: 150,
    },
    sigLine: {
        width: "100%",
        height: 1,
        backgroundColor: BASE_COLORS.borderSubtle,
        marginBottom: 5,
    },
    sigRole: {
        fontSize: 8,
        fontFamily: "DM Sans",
        color: BASE_COLORS.textSecondary,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    // Graphics
    watermark: {
        position: "absolute",
        top: "40%",
        left: "10%",
        fontSize: 120,
        fontFamily: "DM Sans",
        fontWeight: "bold",
        color: "#F8FAFC",
        opacity: 0.03,
        transform: "rotate(-35deg)",
        zIndex: 1,
    },
    sigmaSymbol: {
        position: "absolute",
        left: 40,
        top: "45%",
        fontSize: 180,
        color: BASE_COLORS.textSecondary,
        opacity: 0.04,
        zIndex: 1,
    },
    curveGraphic: {
        position: "absolute",
        right: 60,
        bottom: 120,
        opacity: 0.15,
        zIndex: 1,
    },
    networkPattern: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.04,
        zIndex: 1,
    }
});

// ─── SUB-COMPONENTS ──────────────────────────────────────
const NormalDistribution = ({ color }: { color: string }) => (
    <Svg viewBox="0 0 200 100" style={styles.curveGraphic}>
        <Path
            d="M0,90 Q50,90 100,10 T200,90"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
        />
        <Path d="M100,10 L100,90" stroke={color} strokeWidth={0.5} strokeDasharray="2,2" />
    </Svg>
);

const GeometricPattern = ({ color }: { color: string }) => (
    <Svg viewBox="0 0 800 600" style={styles.networkPattern}>
        <Circle cx="100" cy="100" r="2" fill={color} />
        <Circle cx="700" cy="500" r="2" fill={color} />
        <Circle cx="400" cy="300" r="2" fill={color} />
        <Path d="M100,100 L400,300 L700,500" stroke={color} strokeWidth={0.5} />
        <Path d="M0,0 L800,600 M800,0 L0,600" stroke={color} strokeWidth={0.2} />
    </Svg>
);

// ─── COMPONENT ──────────────────────────────────────────
export function CertificateDocument({ data }: { data: CertificateData }) {
    const belt = BELT_ACCENTS[data.beltLevel] || BELT_ACCENTS.Green;
    const certId = data.certificateId || `NXS-${data.beltLevel.substring(0, 2).toUpperCase()}-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    return (
        <Document
        title={`Nexus Academy — ${data.beltLevel} Belt Certificate`}
            author="Nexus Academy"
            subject={`Lean Six Sigma ${data.beltLevel} Belt Certification`}
        >
            <Page size="A4" orientation="landscape" style={styles.page}>
                {/* Background Graphics */}
                { (data.beltLevel === "Black" || data.beltLevel === "Master Black") && (
                    <GeometricPattern color={belt.primary} />
                )}
                
                <Text style={styles.watermark}>NEXUS ACADEMY</Text>
                <Text style={styles.sigmaSymbol}>Σ</Text>
                
                <NormalDistribution color={belt.secondary} />
                
                {/* Corner Decoration */}
                <View style={[styles.cornerElement, styles.topLeft, { borderColor: belt.secondary }]} />
                <View style={[styles.cornerElement, styles.topRight, { borderColor: belt.secondary }]} />
                <View style={[styles.cornerElement, styles.bottomLeft, { borderColor: belt.secondary }]} />
                <View style={[styles.cornerElement, styles.bottomRight, { borderColor: belt.secondary }]} />
                
                {/* Top Accent Bar */}
                <View style={[styles.topAccentBar, { backgroundColor: belt.primary }]} />

                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.divisionLabel}>Operational Excellence Division</Text>
                        <Text style={styles.academyName}>Nexus Academy</Text>
                    </View>

                    {/* Main Content */}
                    <View style={styles.body}>
                        <Text style={styles.certOfAchievement}>Certificate of Achievement</Text>
                        <Text style={styles.certSubline}>Lean Six Sigma {data.beltLevel} Belt Certification Program</Text>
                        
                        <Text style={styles.certifyThat}>This is to certify that</Text>
                        <Text style={styles.learnerName}>{data.recipientName}</Text>
                        <View style={[styles.nameUnderline, { backgroundColor: belt.primary }]} />
                        
                        <View style={[styles.beltPill, { backgroundColor: belt.primary }]}>
                            <Text style={styles.beltPillText}>{data.beltLevel} Belt</Text>
                        </View>

                        <View style={styles.narrativeBox}>
                            <Text style={styles.narrativeText}>
                                In recognition of successful completion of the Nexus Academy Lean Six Sigma {data.beltLevel} Belt Program and {belt.impact}
                            </Text>
                        </View>
                    </View>

                    {/* Signatures */}
                    <View style={styles.signatureContainer}>
                        <View style={styles.sigBlock}>
                            <View style={styles.sigLine} />
                            <Text style={styles.sigRole}>Program Director</Text>
                        </View>
                        <View style={styles.sigBlock}>
                            <View style={styles.sigLine} />
                            <Text style={styles.sigRole}>Academy Dean</Text>
                        </View>
                    </View>

                    {/* Footer Grid */}
                    <View style={styles.footerGrid}>
                        <View style={styles.gridColumn}>
                            <Text style={styles.columnLabel}>Date of Completion</Text>
                            <Text style={styles.columnValue}>{data.completionDate}</Text>
                        </View>
                        
                        <View style={styles.gridColumnCenter}>
                            <Text style={styles.columnLabel}>Overall Mastery Score</Text>
                            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                                <Text style={styles.scoreValue}>{data.overallScore || "0"}</Text>
                                <Text style={styles.scoreUnit}>%</Text>
                            </View>
                        </View>

                        <View style={styles.gridColumnRight}>
                            <Text style={styles.columnLabel}>Certificate ID</Text>
                            <Text style={styles.columnValue}>{certId}</Text>
                            <Text style={styles.verifySubtext}>Verify at nexus-academy.io/verify</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
