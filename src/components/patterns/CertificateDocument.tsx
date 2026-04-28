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
    beltLevel: "White" | "Yellow" | "Green" | "Black" | "Master Black";
    completionDate: string;
    projectTitle?: string;
    overallScore?: number;
    instructorName?: string;
    certificateId?: string;
}

// ─── DESIGN SYSTEM ─────────────────────────────────────
const BASE_COLORS = {
    background: "#0F172A",
    charcoal: "#111827",
    gold: "#C6A667",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    borderSubtle: "#1E293B",
};

const BELT_ACCENTS: Record<string, { primary: string; secondary: string; impact: string }> = {
    White: { primary: "#D1D5DB", secondary: "#9CA3AF", impact: "demonstrating foundational awareness of Lean Six Sigma principles and core concepts." },
    Yellow: { primary: "#FBBF24", secondary: "#D97706", impact: "demonstrating competency in team participation and fundamental improvement tools." },
    Green: { primary: "#10B981", secondary: "#059669", impact: "demonstrating mastery of DMAIC project execution and data-driven process optimization." },
    Black: { primary: "#C6A667", secondary: "#846B32", impact: "demonstrating mastery of advanced analytics, change leadership, and strategic strategic impact." },
    "Master Black": { primary: "#C6A667", secondary: "#846B32", impact: "demonstrating global mastery of operational excellence strategy and enterprise-wide transformation." },
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
        fontSize: 22,
        fontFamily: FONTS.serifBold,
        letterSpacing: 2,
        color: BASE_COLORS.gold,
        textTransform: "uppercase",
    },
    divisionLabel: {
        fontSize: 7,
        color: BASE_COLORS.textSecondary,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginTop: 2,
    },
    // Body Text
    certTitle: {
        fontSize: 18,
        fontFamily: FONTS.serifBold,
        color: BASE_COLORS.gold,
        letterSpacing: 3,
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 10,
    },
    certSub: {
        fontSize: 10,
        fontFamily: FONTS.primary,
        color: BASE_COLORS.textSecondary,
        marginTop: 5,
        marginBottom: 15,
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
    beltTitle: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: BASE_COLORS.textPrimary,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
        borderTop: "1pt solid " + BASE_COLORS.gold,
        borderBottom: "1pt solid " + BASE_COLORS.gold,
        marginVertical: 10,
        textTransform: "uppercase",
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
    officialSeal: {
        width: 80,
        height: 80,
        objectFit: "contain",
    },
    certIdBox: {
        alignItems: "flex-end",
    },
    idLabel: {
        fontSize: 7,
        color: BASE_COLORS.textSecondary,
        textTransform: "uppercase",
    },
    idValue: {
        fontSize: 9,
        color: BASE_COLORS.gold,
        fontFamily: FONTS.bold,
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
    const belt = BELT_ACCENTS[data.beltLevel] || BELT_ACCENTS.Green;
    const certId = data.certificateId || `NXS-${data.beltLevel.substring(0, 2).toUpperCase()}-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    return (
        <Document title={`Nexus Academy Certification`}>
            <Page size="A4" orientation="landscape" style={styles.page}>
                {/* Official Background Pattern */}
                <Image src="/images/hql/hql-bg.png" style={styles.bgImage} />
                <Text style={styles.watermark}>σ</Text>
                
                {/* Prestige Frame */}
                <View style={styles.frameContainer}>
                    <View style={styles.innerFrame}>
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
                                <Text style={styles.presentedTo}>Certificate of Achievement</Text>
                                <Text style={styles.certSub}>LEAN SIX SIGMA {data.beltLevel.toUpperCase()} BELT CERTIFICATION</Text>
                                
                                <Text style={styles.presentedTo}>This is to certify that</Text>
                                <Text style={styles.recipient}>{data.recipientName}</Text>
                                
                                <Text style={styles.beltTitle}>{data.beltLevel} Belt</Text>

                                <Text style={styles.narrative}>
                                    Has successfully completed the comprehensive Nexus Academy Lean Six Sigma training and {belt.impact}
                                </Text>
                            </View>

                            {/* Official Gold Seal Asset */}
                            <View style={styles.sealContainer}>
                                <Image src="/images/hql/hql-seal.jpg" style={styles.officialSeal} />
                            </View>

                            {/* Footer & Details */}
                            <View style={styles.footer}>
                                <View style={styles.signatureBlock}>
                                    <Image src="/images/hql/hql-sign.png" style={styles.signatureImage} />
                                    <View style={styles.sigLine} />
                                    <Text style={styles.sigLabel}>Program Director</Text>
                                </View>

                                <View style={styles.certIdBox}>
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
