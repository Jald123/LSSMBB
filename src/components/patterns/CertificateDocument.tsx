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
    },
    // Background Graphics
    bgGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 300,
        backgroundColor: BASE_COLORS.charcoal,
        opacity: 0.8,
    },
    watermark: {
        position: "absolute",
        top: "40%",
        left: "30%",
        fontSize: 240,
        fontFamily: FONTS.bold,
        color: BASE_COLORS.gold,
        opacity: 0.02,
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
        marginBottom: 20,
    },
    crestBox: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    academyName: {
        fontSize: 24,
        fontFamily: FONTS.serifBold,
        letterSpacing: 4,
        color: BASE_COLORS.gold,
        textTransform: "uppercase",
    },
    divisionLabel: {
        fontSize: 8,
        color: BASE_COLORS.textSecondary,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginTop: 4,
    },
    // Body Text
    certTitle: {
        fontSize: 18,
        fontFamily: FONTS.serifBold,
        color: BASE_COLORS.gold,
        letterSpacing: 3,
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 15,
    },
    certSub: {
        fontSize: 10,
        fontFamily: FONTS.primary,
        color: BASE_COLORS.textSecondary,
        marginTop: 5,
        marginBottom: 20,
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
        marginVertical: 10,
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
    },
    narrative: {
        fontSize: 10,
        width: 480,
        textAlign: "center",
        color: BASE_COLORS.textSecondary,
        lineHeight: 1.6,
        fontFamily: FONTS.primary,
    },
    // Footer Section
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderTop: "0.5pt solid " + BASE_COLORS.borderSubtle,
        paddingTop: 20,
        marginTop: 20,
    },
    signatureBlock: {
        alignItems: "center",
        width: 150,
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
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: -30,
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

// ─── SVG GRAPHICS ───────────────────────────────────────
const LaurelCrest = ({ color }: { color: string }) => (
    <Svg viewBox="0 0 100 100" style={styles.crestBox}>
        {/* Wreath */}
        <Path d="M30,70 Q10,70 10,30 Q10,10 30,10" fill="none" stroke={color} strokeWidth="2" />
        <Path d="M70,70 Q90,70 90,30 Q90,10 70,10" fill="none" stroke={color} strokeWidth="2" />
        {/* Leaves */}
        <Circle cx="15" cy="40" r="3" fill={color} />
        <Circle cx="85" cy="40" r="3" fill={color} />
        <Circle cx="20" cy="25" r="3" fill={color} />
        <Circle cx="80" cy="25" r="3" fill={color} />
        {/* Core Symbol */}
        <Text x="50" y="65" fontSize="40" fontFamily={FONTS.bold} textAnchor="middle" fill={color}>σ</Text>
    </Svg>
);

const GoldSeal = ({ color }: { color: string }) => (
    <View style={styles.sealContainer}>
        {/* Ribbon */}
        <Svg width="40" height="60" style={{ position: "absolute", bottom: -20, left: 10 }}>
            <Path d="M0,0 L15,60 L30,0 Z" fill="#991B1B" opacity="0.8" />
        </Svg>
        <Svg width="40" height="60" style={{ position: "absolute", bottom: -20, right: 10 }}>
            <Path d="M0,0 L15,60 L30,0 Z" fill="#991B1B" opacity="0.8" />
        </Svg>
        {/* Embossed Seal */}
        <Svg width="80" height="80">
            <Circle cx="40" cy="40" r="38" fill={color} />
            <Circle cx="40" cy="40" r="34" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="2,2" />
            <Text x="40" y="47" fontSize="20" fontFamily={FONTS.bold} textAnchor="middle" fill="#000000" opacity="0.7">NA</Text>
            <Circle cx="40" cy="40" r="30" fill="none" stroke="#000000" strokeWidth="0.5" opacity="0.2" />
        </Svg>
    </View>
);

const HologramStamp = () => (
    <Svg width="60" height="60" style={styles.hologram}>
        <Circle cx="30" cy="30" r="28" fill="none" stroke="#F8FAFC" strokeWidth="0.5" />
        <Text x="30" y="35" fontSize="8" fontFamily={FONTS.bold} textAnchor="middle" fill="#F8FAFC">VERIFIED</Text>
        <Path d="M10,30 L50,30 M30,10 L30,50" stroke="#F8FAFC" strokeWidth="0.2" />
    </Svg>
);

// ─── COMPONENT ──────────────────────────────────────────
export function CertificateDocument({ data }: { data: CertificateData }) {
    const belt = BELT_ACCENTS[data.beltLevel] || BELT_ACCENTS.Green;
    const certId = data.certificateId || `NXS-${data.beltLevel.substring(0, 2).toUpperCase()}-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    return (
        <Document title={`Nexus Academy Certification`}>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.bgGradient} />
                <Text style={styles.watermark}>σ</Text>
                
                {/* Prestige Frame */}
                <View style={styles.frameContainer}>
                    <View style={styles.innerFrame}>
                        <View style={[styles.cornerArt, styles.cornerTL]} />
                        <View style={[styles.cornerArt, styles.cornerTR]} />
                        <View style={[styles.cornerArt, styles.cornerBL]} />
                        <View style={[styles.cornerArt, styles.cornerBR]} />
                        
                        <View style={styles.main}>
                            {/* Header Group */}
                            <View style={styles.header}>
                                <LaurelCrest color={BASE_COLORS.gold} />
                                <Text style={styles.academyName}>Nexus Academy</Text>
                                <Text style={styles.divisionLabel}>Operational Excellence Division</Text>
                            </View>

                            <HologramStamp />

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

                            {/* Seal Centerpiece */}
                            <GoldSeal color={BASE_COLORS.gold} />

                            {/* Footer & Details */}
                            <View style={styles.footer}>
                                <View style={styles.signatureBlock}>
                                    <View style={styles.sigLine} />
                                    <Text style={styles.sigLabel}>Program Director</Text>
                                </View>

                                <View style={styles.certIdBox}>
                                    <Text style={styles.idLabel}>Certificate Number</Text>
                                    <Text style={styles.idValue}>{certId}</Text>
                                    <Text style={styles.idLabel}>Completion Date: {data.completionDate}</Text>
                                </View>

                                <View style={styles.signatureBlock}>
                                    <View style={styles.sigLine} />
                                    <Text style={styles.sigLabel}>Academy Dean</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
