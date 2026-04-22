"use client";

import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

// ─── FONT REGISTRATION ─────────────────────────────────
// Using system-safe fonts for PDF rendering reliability
Font.register({
    family: "Helvetica",
    fonts: [
        { src: "Helvetica" },
        { src: "Helvetica-Bold", fontWeight: "bold" },
        { src: "Helvetica-Oblique", fontStyle: "italic" },
    ],
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

// ─── BELT COLOR MAP ─────────────────────────────────────
const BELT_COLORS: Record<string, { primary: string; accent: string; glow: string }> = {
    White: { primary: "#F0F0F0", accent: "#9CA3AF", glow: "#E5E7EB" },
    Yellow: { primary: "#FACC15", accent: "#EAB308", glow: "#FDE68A" },
    Green: { primary: "#22C55E", accent: "#16A34A", glow: "#86EFAC" },
    Black: { primary: "#1F2937", accent: "#6366F1", glow: "#818CF8" },
    "Master Black": { primary: "#7C3AED", accent: "#A855F7", glow: "#C084FC" },
};

// ─── STYLES ─────────────────────────────────────────────
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#0A0E1A",
        padding: 0,
        fontFamily: "Helvetica",
        position: "relative",
    },
    // Outer border frame
    outerFrame: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        borderWidth: 2,
        borderColor: "#1E293B",
        borderRadius: 8,
    },
    innerFrame: {
        position: "absolute",
        top: 28,
        left: 28,
        right: 28,
        bottom: 28,
        borderWidth: 1,
        borderColor: "#334155",
        borderRadius: 4,
    },
    // Top accent bar
    accentBar: {
        height: 6,
        marginTop: 38,
        marginLeft: 38,
        marginRight: 38,
        borderRadius: 3,
    },
    // Header section
    header: {
        marginTop: 30,
        alignItems: "center",
    },
    orgLabel: {
        fontSize: 9,
        letterSpacing: 8,
        color: "#64748B",
        textTransform: "uppercase",
        marginBottom: 6,
    },
    orgName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#F8FAFC",
        letterSpacing: 4,
        textTransform: "uppercase",
    },
    divider: {
        width: 80,
        height: 1,
        backgroundColor: "#334155",
        marginVertical: 16,
    },
    // Certificate title
    certTitle: {
        fontSize: 11,
        letterSpacing: 10,
        color: "#94A3B8",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    certSubtitle: {
        fontSize: 9,
        color: "#64748B",
        letterSpacing: 3,
    },
    // Recipient section
    recipientSection: {
        marginTop: 28,
        alignItems: "center",
    },
    presentedTo: {
        fontSize: 9,
        letterSpacing: 5,
        color: "#64748B",
        textTransform: "uppercase",
        marginBottom: 14,
    },
    recipientName: {
        fontSize: 36,
        fontWeight: "bold",
        fontStyle: "italic",
        letterSpacing: 2,
        marginBottom: 8,
    },
    underline: {
        width: 260,
        height: 1,
        marginBottom: 8,
    },
    // Belt badge
    beltBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginTop: 14,
        borderWidth: 1,
    },
    beltText: {
        fontSize: 11,
        fontWeight: "bold",
        letterSpacing: 4,
        textTransform: "uppercase",
    },
    // Description section
    descriptionSection: {
        marginTop: 24,
        marginHorizontal: 80,
        alignItems: "center",
    },
    descriptionText: {
        fontSize: 9,
        color: "#94A3B8",
        textAlign: "center",
        lineHeight: 1.7,
    },
    // Score section
    scoreSection: {
        marginTop: 20,
        alignItems: "center",
    },
    scoreLabel: {
        fontSize: 8,
        letterSpacing: 4,
        color: "#64748B",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#F8FAFC",
    },
    scoreUnit: {
        fontSize: 10,
        color: "#64748B",
    },
    // Details grid
    detailsGrid: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        gap: 40,
    },
    detailItem: {
        alignItems: "center",
    },
    detailLabel: {
        fontSize: 7,
        letterSpacing: 3,
        color: "#475569",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 10,
        color: "#CBD5E1",
        fontWeight: "bold",
    },
    // Signatures
    signatureSection: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
        marginHorizontal: 60,
    },
    signatureBlock: {
        alignItems: "center",
    },
    signatureLine: {
        width: 140,
        height: 1,
        backgroundColor: "#334155",
        marginBottom: 6,
    },
    signatureLabel: {
        fontSize: 7,
        letterSpacing: 2,
        color: "#64748B",
        textTransform: "uppercase",
    },
    // Footer
    footer: {
        position: "absolute",
        bottom: 38,
        left: 38,
        right: 38,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerText: {
        fontSize: 7,
        color: "#334155",
        letterSpacing: 1,
    },
    certIdText: {
        fontSize: 7,
        color: "#475569",
        fontFamily: "Courier",
    },
    // Watermark
    watermark: {
        position: "absolute",
        top: "40%",
        left: "15%",
        fontSize: 80,
        color: "#0F172A",
        fontWeight: "bold",
        letterSpacing: 20,
        transform: "rotate(-30deg)",
        opacity: 0.3,
    },
});

// ─── COMPONENT ──────────────────────────────────────────
export function CertificateDocument({ data }: { data: CertificateData }) {
    const belt = BELT_COLORS[data.beltLevel] || BELT_COLORS.Green;
    const certId = data.certificateId || `NXS-${Date.now().toString(36).toUpperCase()}`;

    return (
        <Document
            title={`Nexus Academy — ${data.beltLevel} Belt Certificate`}
            author="Nexus Academy"
            subject={`Lean Six Sigma ${data.beltLevel} Belt Certification`}
        >
            <Page size="A4" orientation="landscape" style={styles.page}>
                {/* Watermark */}
                <Text style={styles.watermark}>NEXUS</Text>

                {/* Frame borders */}
                <View style={styles.outerFrame} />
                <View style={styles.innerFrame} />

                {/* Top Accent Bar */}
                <View style={[styles.accentBar, { backgroundColor: belt.primary }]} />

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.orgLabel}>Operational Excellence Division</Text>
                    <Text style={styles.orgName}>Nexus Academy</Text>
                    <View style={styles.divider} />
                    <Text style={styles.certTitle}>Certificate of Achievement</Text>
                    <Text style={styles.certSubtitle}>Lean Six Sigma Certification Program</Text>
                </View>

                {/* Recipient */}
                <View style={styles.recipientSection}>
                    <Text style={styles.presentedTo}>This is to certify that</Text>
                    <Text style={[styles.recipientName, { color: belt.primary }]}>
                        {data.recipientName}
                    </Text>
                    <View style={[styles.underline, { backgroundColor: belt.accent }]} />
                </View>

                {/* Belt Badge */}
                <View style={{ alignItems: "center" }}>
                    <View
                        style={[
                            styles.beltBadge,
                            {
                                backgroundColor: `${belt.primary}15`,
                                borderColor: `${belt.primary}40`,
                            },
                        ]}
                    >
                        <Text style={[styles.beltText, { color: belt.primary }]}>
                            ◆ {data.beltLevel} Belt ◆
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionText}>
                        Has successfully completed all required coursework, tooling mastery, and
                        project execution protocols within the Nexus Academy Lean Six Sigma {data.beltLevel} Belt
                        Certification Program — demonstrating operational excellence and continuous improvement methodology.
                    </Text>
                </View>

                {/* Score (optional) */}
                {data.overallScore !== undefined && (
                    <View style={styles.scoreSection}>
                        <Text style={styles.scoreLabel}>Overall Mastery Score</Text>
                        <Text style={styles.scoreValue}>
                            {data.overallScore}
                            <Text style={styles.scoreUnit}>%</Text>
                        </Text>
                    </View>
                )}

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Date of Completion</Text>
                        <Text style={styles.detailValue}>{data.completionDate}</Text>
                    </View>
                    {data.projectTitle && (
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Capstone Project</Text>
                            <Text style={styles.detailValue}>{data.projectTitle}</Text>
                        </View>
                    )}
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Certificate ID</Text>
                        <Text style={[styles.detailValue, { fontFamily: "Courier" }]}>{certId}</Text>
                    </View>
                </View>

                {/* Signatures */}
                <View style={styles.signatureSection}>
                    <View style={styles.signatureBlock}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureLabel}>
                            {data.instructorName || "Program Director"}
                        </Text>
                    </View>
                    <View style={styles.signatureBlock}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureLabel}>Academy Dean</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        nexus-academy.io • Operational Excellence Platform
                    </Text>
                    <Text style={styles.certIdText}>{certId}</Text>
                </View>
            </Page>
        </Document>
    );
}
