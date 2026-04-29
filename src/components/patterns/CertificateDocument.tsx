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
// Using Built-in PDF Standard Fonts for maximum reliability
const FONTS = {
    primary: "Helvetica",
    bold: "Helvetica-Bold",
    serif: "Times-Roman",
    serifBold: "Times-Bold",
};

// ─── TYPES ──────────────────────────────────────────────
export interface CertificateData {
    recipientName: string;
    beltLevel: string;
    completionDate: string;
    projectTitle?: string;
    overallScore?: number;
    instructorName?: string;
    certificateId?: string;
}

// ─── DESIGN SYSTEM ─────────────────────────────────────
const BASE_COLORS = {
    background: "#080D1A", // Darker blue, not pure black
    charcoal: "#111827",
    gold: "#C6A667",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    borderSubtle: "#1E293B",
};

const CERT_CONFIGS: Record<string, { primary: string; secondary: string; impact: string; bgColor: string; frameStyle?: any }> = {
    White: { primary: "#D1D5DB", secondary: "#9CA3AF", bgColor: "#0D1117", impact: "demonstrating foundational awareness of Lean Six Sigma principles and core concepts." },
    Yellow: { primary: "#FBBF24", secondary: "#D97706", bgColor: "#131008", impact: "demonstrating competency in team participation and fundamental improvement tools." },
    Green: { primary: "#10B981", secondary: "#059669", bgColor: "#08130D", impact: "demonstrating mastery of DMAIC project execution and data-driven process optimization." },
    Black: { primary: "#FFFFFF", secondary: "#846B32", bgColor: "#050505", impact: "demonstrating mastery of advanced analytics, change leadership, and strategic strategic impact." },
    "Master Black": { primary: "#C6A667", secondary: "#846B32", bgColor: "#0D0C08", impact: "demonstrating global mastery of operational excellence strategy and enterprise-wide transformation." },
    
    // New Professional Tracks
    "Healthcare Project Leadership & Transformation": { 
        primary: "#A78BFA", secondary: "#7C3AED", bgColor: "#0F0B1A", 
        impact: "for successfully leading high‑impact healthcare projects and change initiatives across clinical, operational, and digital domains.",
        frameStyle: { borderStyle: "solid", borderRightWidth: 4, borderLeftWidth: 4 }
    },
    "Lean, Kaizen & Operational Excellence in Healthcare": { 
        primary: "#34D399", secondary: "#059669", bgColor: "#0B1A14", 
        impact: "for designing smoother patient journeys and high‑flow care pathways through Lean thinking, Kaizen events, and standard work.",
        frameStyle: { borderRadius: 30 }
    },
    "Data‑Driven Six Sigma & Care Design": { 
        primary: "#60A5FA", secondary: "#2563EB", bgColor: "#0B111A", 
        impact: "for using analytics, Design for Six Sigma, and statistics to engineer safer, more reliable healthcare processes.",
        frameStyle: { borderStyle: "dashed" }
    },
    "Clinical Excellence & ISO‑Based Quality Management": { 
        primary: "#F87171", secondary: "#DC2626", bgColor: "#1A0B0B", 
        impact: "for embedding PDCA, CQI, and robust investigations to meet and exceed modern healthcare quality and patient‑safety standards.",
        frameStyle: { borderStyle: "solid", borderWidth: 3 }
    },
    "Value‑Based Finance, Innovation & Risk in Health Services": { 
        primary: "#FBBF24", secondary: "#D97706", bgColor: "#1A150B", 
        impact: "for aligning ROI, innovation, and enterprise risk so that health‑care projects create measurable value, protect financial performance, and support value‑based care strategies.",
        frameStyle: { borderStyle: "solid", borderTopWidth: 5, borderBottomWidth: 5 }
    }
};

// ─── STYLES ─────────────────────────────────────────────
const styles = StyleSheet.create({
    page: {
        backgroundColor: BASE_COLORS.background,
        padding: 0,
        fontFamily: FONTS.primary,
        position: "relative",
    },
    // Background Image
    bgImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.15,
    },
    watermark: {
        position: "absolute",
        top: "40%",
        left: "35%",
        fontSize: 240,
        fontFamily: FONTS.bold,
        color: BASE_COLORS.gold,
        opacity: 0.015,
        transform: "rotate(-25deg)",
    },
    // Frame
    frameContainer: {
        position: "absolute",
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
        border: "1pt solid " + BASE_COLORS.gold,
        padding: 3,
    },
    innerFrame: {
        flex: 1,
        border: "0.5pt solid " + BASE_COLORS.gold,
        padding: 20,
        position: "relative",
    },
    cornerArt: {
        position: "absolute",
        width: 40,
        height: 40,
        border: "2pt solid " + BASE_COLORS.gold,
    },
    cornerTL: { top: -2, left: -2, borderRightWidth: 0, borderBottomWidth: 0 },
    cornerTR: { top: -2, right: -2, borderLeftWidth: 0, borderBottomWidth: 0 },
    cornerBL: { bottom: -2, left: -2, borderRightWidth: 0, borderTopWidth: 0 },
    cornerBR: { bottom: -2, right: -2, borderLeftWidth: 0, borderTopWidth: 0 },
    
    // Layout
    main: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
    },
    // Header
    header: {
        alignItems: "center",
        marginBottom: 10,
    },
    logoBox: {
        width: 200,
        height: 160,
        marginBottom: 5,
        objectFit: "contain",
    },
    academyName: {
        fontSize: 11,
        fontFamily: FONTS.serifBold,
        letterSpacing: 2,
        color: BASE_COLORS.gold,
        textTransform: "uppercase",
        marginTop: -5,
    },
    divisionLabel: {
        fontSize: 7,
        color: BASE_COLORS.textSecondary,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginTop: 2,
    },
    // Body Text
    mainCertTitle: {
        fontSize: 22,
        fontFamily: FONTS.serifBold,
        color: BASE_COLORS.gold,
        letterSpacing: 4,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 8,
    },
    certSub: {
        fontSize: 9,
        fontFamily: FONTS.bold,
        color: BASE_COLORS.textSecondary,
        marginTop: 0,
        marginBottom: 15,
        letterSpacing: 1,
    },
    presentedTo: {
        fontSize: 11,
        fontFamily: FONTS.primary,
        color: BASE_COLORS.textSecondary,
        textTransform: "uppercase",
        letterSpacing: 4,
    },
    recipient: {
        fontSize: 42,
        fontFamily: FONTS.serifBold,
        color: BASE_COLORS.textPrimary,
        marginVertical: 5,
    },
    beltHighlightContainer: {
        paddingVertical: 4,
        paddingHorizontal: 25,
        borderTop: "1.5pt solid " + BASE_COLORS.gold,
        borderBottom: "1.5pt solid " + BASE_COLORS.gold,
        marginVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    beltTitle: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    narrative: {
        fontSize: 9.5,
        width: 480,
        textAlign: "center",
        color: BASE_COLORS.textSecondary,
        lineHeight: 1.5,
        fontFamily: FONTS.primary,
    },
    // Footer Section
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderTop: "0.5pt solid " + BASE_COLORS.borderSubtle,
        paddingTop: 15,
        marginTop: 15,
    },
    signatureBlock: {
        alignItems: "center",
        width: 160,
    },
    signatureImage: {
        width: 245,
        height: 105,
        marginBottom: -15,
        objectFit: "contain",
    },
    deanSignatureImage: {
        width: 140,
        height: 60,
        marginBottom: -5,
        objectFit: "contain",
    },
    sigLine: {
        width: "100%",
        height: 1,
        backgroundColor: BASE_COLORS.gold,
        marginBottom: 5,
    },
    sigLabel: {
        fontSize: 8,
        color: BASE_COLORS.textSecondary,
        textTransform: "uppercase",
    },
    // Seal & ID
    sealContainer: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: -20,
    },
    officialSealContainer: {
        width: 90,
        height: 90,
        position: "absolute",
        top: -100, 
        left: "50%",
        marginLeft: -45,
        zIndex: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    officialSeal: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        opacity: 1,
    },
    certIdBox: {
        alignItems: "center", 
        position: "relative",
        minWidth: 150,
        marginTop: 25,
    },
    idLabel: {
        fontSize: 7,
        color: BASE_COLORS.textSecondary,
        textTransform: "uppercase",
    },
    idValue: {
        fontSize: 10,
        color: BASE_COLORS.gold,
        fontFamily: FONTS.bold,
        marginTop: 2,
    },
    hologram: {
        position: "absolute",
        top: 25,
        right: 25,
        opacity: 0.15,
    }
});

// ─── COMPONENT ──────────────────────────────────────────
export function CertificateDocument({ data }: { data: CertificateData }) {
    const belt = CERT_CONFIGS[data.beltLevel] || CERT_CONFIGS.Green;
    const certId = data.certificateId || `HQL-${data.beltLevel.substring(0, 3).toUpperCase()}-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    return (
        <Document title={`HQL Certification`}>
            <Page size="A4" orientation="landscape" style={[styles.page, { backgroundColor: belt.bgColor }]}>
                {/* Official Background Pattern */}
                <Image src="/images/hql/hql-bg.png" style={styles.bgImage} />
                <Text style={styles.watermark}>HQL</Text>
                
                {/* Prestige Frame */}
                <View style={styles.frameContainer}>
                    <View style={[styles.innerFrame, belt.frameStyle]}>
                        <View style={[styles.cornerArt, styles.cornerTL]} />
                        <View style={[styles.cornerArt, styles.cornerTR]} />
                        <View style={[styles.cornerArt, styles.cornerBL]} />
                        <View style={[styles.cornerArt, styles.cornerBR]} />
                        
                        <View style={styles.main}>
                            {/* Header Group with Official Logo */}
                            <View style={styles.header}>
                                <Image src="/images/hql/hql-logo.png" style={styles.logoBox} />
                                <Text style={styles.academyName}>Health Quality Leaders</Text>
                                <Text style={styles.divisionLabel}>Operational Excellence Division</Text>
                            </View>

                            {/* Body Group */}
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.mainCertTitle}>Certificate of Achievement</Text>
                                <Text style={styles.certSub}>LEAN SIX SIGMA {data.beltLevel.toUpperCase()} BELT CERTIFICATION</Text>
                                
                                <Text style={styles.presentedTo}>This is to certify that</Text>
                                <Text style={styles.recipient}>{data.recipientName}</Text>
                                
                                <View style={[
                                    styles.beltHighlightContainer,
                                    { backgroundColor: data.beltLevel === "White" ? "#4B5563" : (data.beltLevel === "Black" ? "#FFFFFF" : belt.primary) }
                                ]}>
                                    <Text style={[
                                        styles.beltTitle, 
                                        { 
                                            color: data.beltLevel === "Black" ? "#000000" : "#FFFFFF",
                                            fontSize: data.beltLevel.includes("Value‑Based Finance") ? 15 : 20
                                        }
                                    ]}>
                                        {data.beltLevel.includes("Belt") || data.beltLevel.length > 20 ? data.beltLevel : `${data.beltLevel} Belt`}
                                    </Text>
                                </View>

                                <Text style={styles.narrative}>
                                    Has successfully completed the comprehensive Nexus Academy Lean Six Sigma training and {belt.impact}
                                </Text>
                            </View>
                            {/* Footer & Details */}
                            <View style={styles.footer}>
                                <View style={styles.signatureBlock}>
                                    <Image src="/images/hql/hql-sign.png" style={styles.signatureImage} />
                                    <View style={styles.sigLine} />
                                    <Text style={styles.sigLabel}>Program Director</Text>
                                </View>

                                <View style={styles.certIdBox}>
                                    <View style={styles.officialSealContainer}>
                                        <Image src="/images/hql/hologram-seal.png" style={styles.officialSeal} />
                                        <Image src="/images/hql/hologram-seal.png" style={[styles.officialSeal, { position: 'absolute' }]} />
                                        <Image src="/images/hql/hologram-seal.png" style={[styles.officialSeal, { position: 'absolute' }]} />
                                        <Image src="/images/hql/hologram-seal.png" style={[styles.officialSeal, { position: 'absolute' }]} />
                                        <Image src="/images/hql/hologram-seal.png" style={[styles.officialSeal, { position: 'absolute' }]} />
                                    </View>
                                    <Text style={styles.idLabel}>Certificate Number</Text>
                                    <Text style={styles.idValue}>{certId}</Text>
                                    <Text style={styles.idLabel}>Completion Date: {data.completionDate}</Text>
                                </View>

                                <View style={styles.signatureBlock}>
                                    <Image src="/images/hql/hql-dean-sign.png" style={styles.deanSignatureImage} />
                                    <View style={styles.sigLine} />
                                    <Text style={styles.sigLabel}>Nexus Academy</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
