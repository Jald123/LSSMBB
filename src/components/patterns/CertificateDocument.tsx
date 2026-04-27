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
// (Helvetica, Times-Roman, Courier require no network requests)
const FONTS = {
    primary: "Helvetica",
    bold: "Helvetica-Bold",
    serif: "Times-Roman",
    serifBold: "Times-Bold",
};

// ─── TYPES ──────────────────────────────────────────────
export type CredentialType = 
    | "White Belt" 
    | "Yellow Belt" 
    | "Green Belt" 
    | "Black Belt" 
    | "Master Black Belt" 
    | "DMADV (DESIGN)" 
    | "KAIZEN (EVENT)" 
    | "FOCUS PDCA (QUALITY)";

export interface CertificateData {
    recipientName: string;
    credentialType: CredentialType;
    completionDate: string;
    projectTitle?: string;
    overallScore?: number;
    instructorName?: string;
    certificateId?: string;
}

// ─── DESIGN SYSTEM ─────────────────────────────────────
const BASE_COLORS = {
    obsidian: "#050A10",
    charcoal: "#1C1C1E",
    textPrimary: "#F5F7FA",
    textSecondary: "#8D99A7",
    borderSubtle: "#2C2C2E",
    goldFoil: "#D4AF37",
};

export const CREDENTIAL_DETAILS: Record<CredentialType, { theme: 'classic' | 'glass'; primary: string; secondary: string; impact: string; prefix: string }> = {
    // Classic Premium Gold (LSS)
    "White Belt": { theme: 'classic', primary: "#D9E2EC", secondary: "#9FB3C8", impact: "demonstrating foundational awareness of Lean Six Sigma principles and core concepts of operational excellence.", prefix: "Lean Six Sigma program:" },
    "Yellow Belt": { theme: 'classic', primary: "#FFC857", secondary: "#D89C1E", impact: "demonstrating competency in team participation, fundamental improvement tools, and supporting DMAIC project execution.", prefix: "Lean Six Sigma program:" },
    "Green Belt": { theme: 'classic', primary: "#00C853", secondary: "#008C3A", impact: "demonstrating competency in DMAIC, problem solving, and leading data-driven improvement projects.", prefix: "Lean Six Sigma program:" },
    "Black Belt": { theme: 'classic', primary: "#2196F3", secondary: "#1565C0", impact: "demonstrating mastery of advanced analytics and executing cross-functional improvement initiatives.", prefix: "Lean Six Sigma program:" },
    "Master Black Belt": { theme: 'classic', primary: "#D4AF37", secondary: "#B8860B", impact: "demonstrating global mastery of operational excellence strategy and guiding enterprise-wide cultural transformation.", prefix: "Lean Six Sigma program:" },
    
    // Executive Glass (Specialty)
    "DMADV (DESIGN)": { theme: 'glass', primary: "#00E5FF", secondary: "#00838F", impact: "demonstrating robust competency in designing new processes and products at precise quality levels.", prefix: "Advanced Methodology:" },
    "KAIZEN (EVENT)": { theme: 'glass', primary: "#FF6D00", secondary: "#E65100", impact: "demonstrating expertise in leading rapid improvement events and driving immediate operational changes.", prefix: "Advanced Methodology:" },
    "FOCUS PDCA (QUALITY)": { theme: 'glass', primary: "#D500F9", secondary: "#7B1FA2", impact: "demonstrating a structured approach to continuous quality improvement and rigorous problem solving.", prefix: "Advanced Methodology:" }
};

const styles = StyleSheet.create({
    page: {
        padding: 0,
        position: "relative",
    },
    bgImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    classicBorderHighlight: {
        position: "absolute",
        top: 15, left: 15, right: 15, bottom: 15,
        borderWidth: 2,
    },
    classicInnerBorder: {
        position: "absolute",
        top: 25, left: 25, right: 25, bottom: 25,
        borderWidth: 1,
        opacity: 0.5,
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
        padding: 60,
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
        fontFamily: FONTS.primary,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 5,
    },
    academyName: {
        fontSize: 28,
        color: BASE_COLORS.textPrimary,
        fontFamily: FONTS.bold,
        letterSpacing: 4,
        textTransform: "uppercase",
        marginTop: 10,
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
        fontFamily: FONTS.bold,
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
        fontFamily: FONTS.bold,
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
        fontFamily: FONTS.bold,
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
        fontFamily: FONTS.bold,
        fontWeight: "bold",
        color: BASE_COLORS.textSecondary,
        textTransform: "uppercase",
        marginBottom: 4,
    },
    columnValue: {
        fontSize: 11,
        color: BASE_COLORS.textPrimary,
        fontFamily: FONTS.bold,
    },
    scoreValue: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        fontWeight: "bold",
        color: BASE_COLORS.textPrimary,
    },
    scoreUnit: {
        fontSize: 10,
        color: BASE_COLORS.textSecondary,
        fontFamily: FONTS.primary,
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
        fontFamily: FONTS.primary,
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
        fontFamily: FONTS.bold,
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
    }
});

// ─── SUB-COMPONENTS ──────────────────────────────────────
const SigmaGearLogo = ({ color }: { color: string }) => (
    <Svg viewBox="0 0 100 100" style={{ width: 60, height: 60, marginBottom: 10 }}>
        {/* Gear circles/teeth could be complex, simplifying to a professional gear icon with Sigma */}
        <Circle cx="50" cy="50" r="40" stroke={color} strokeWidth="2" fill="none" />
        <Circle cx="50" cy="50" r="32" stroke={color} strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <Text x="50" y="60" textAnchor="middle" style={{ fontSize: 35, fill: color, fontFamily: FONTS.bold }}>Σ</Text>
        <Path d="M20,50 L5,50 M95,50 L80,50 M50,20 L50,5 M50,95 L50,80" stroke={color} strokeWidth="2" />
    </Svg>
);

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
    const meta = CREDENTIAL_DETAILS[data.credentialType] || CREDENTIAL_DETAILS["Green Belt"];
    const isClassic = meta.theme === 'classic';
    const certId = data.certificateId || `NXS-${data.credentialType.substring(0, 2).toUpperCase().replace(/\s/g, '')}-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    return (
        <Document
            title={`Nexus Academy — ${data.credentialType} Certificate`}
            author="Nexus Academy"
            subject={`${data.credentialType} Certification`}
        >
            <Page size="A4" orientation="landscape" style={[styles.page, { 
                backgroundColor: isClassic ? "#0B1015" : BASE_COLORS.obsidian,
                fontFamily: isClassic ? FONTS.serif : FONTS.primary
            }]}>
                {/* Background Layer */}
                {isClassic ? (
                    <Image src="/images/classic-gold-bg.png" style={styles.bgImage} />
                ) : (
                    <GeometricPattern color={meta.primary} />
                )}
                
                {!isClassic && (
                    <>
                        <Text style={styles.watermark}>NEXUS ACADEMY</Text>
                        <Text style={styles.sigmaSymbol}>Σ</Text>
                        <NormalDistribution color={meta.secondary} />
                    </>
                )}
                
                {/* Global Overlays */}
                {!isClassic && (
                    <>
                        <View style={[styles.cornerElement, styles.topLeft, { borderColor: meta.secondary }]} />
                        <View style={[styles.cornerElement, styles.topRight, { borderColor: meta.secondary }]} />
                        <View style={[styles.cornerElement, styles.bottomLeft, { borderColor: meta.secondary }]} />
                        <View style={[styles.cornerElement, styles.bottomRight, { borderColor: meta.secondary }]} />
                        <View style={[styles.topAccentBar, { backgroundColor: meta.primary }]} />
                    </>
                )}

                <View style={styles.container}>
                    {/* Header with Sigma-Gear Logo */}
                    <View style={styles.header}>
                        <SigmaGearLogo color={isClassic ? BASE_COLORS.goldFoil : meta.primary} />
                        <Text style={[styles.academyName, isClassic ? { color: BASE_COLORS.goldFoil, fontFamily: FONTS.serifBold } : { color: meta.primary }]}>Nexus Academy</Text>
                    </View>

                    {/* Main Content - Centered & Engraved */}
                    <View style={styles.body}>
                        <Text style={[styles.certOfAchievement, isClassic ? { color: BASE_COLORS.goldFoil, fontFamily: FONTS.serifBold } : { color: BASE_COLORS.textPrimary }]}>Certificate of Achievement</Text>
                        
                        <View style={{ marginVertical: 10 }}>
                             <Text style={[styles.certSubline, isClassic && { fontFamily: FONTS.serif }]}>{meta.prefix} {data.credentialType}</Text>
                        </View>
                        
                        <Text style={styles.certifyThat}>This is to certify that</Text>
                        <Text style={[styles.learnerName, isClassic ? { color: BASE_COLORS.goldFoil, fontFamily: FONTS.serifBold } : { color: BASE_COLORS.textPrimary }]}>{data.recipientName}</Text>
                        <View style={[styles.nameUnderline, { backgroundColor: isClassic ? BASE_COLORS.goldFoil : meta.primary, opacity: 0.3 }]} />
                        
                        <View style={{ marginTop: 10 }}>
                            <Text style={[styles.narrativeText, isClassic && { fontFamily: FONTS.serif }]}>
                                HAS SUCCESSFULLY COMPLETED THE REQUIREMENTS FOR THE
                            </Text>
                            <Text style={{ fontSize: 13, color: meta.primary, fontFamily: FONTS.bold, marginTop: 5, textAlign: "center" }}>
                                {data.credentialType.toUpperCase()} CERTIFICATION
                            </Text>
                        </View>
                    </View>

                    {/* Signatures & Seal (Aligned like reference) */}
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingHorizontal: 40 }}>
                        <View style={styles.sigBlock}>
                            <View style={styles.sigLine} />
                            <Text style={[styles.sigRole, { color: BASE_COLORS.textPrimary, fontSize: 10 }]}>Michael Thorne</Text>
                            <Text style={styles.sigRole}>Director of Education</Text>
                        </View>

                        {/* Symbolic Seal Placeholder */}
                        <View style={{ width: 80, height: 80, borderRadius: 40, border: `2px solid ${isClassic ? BASE_COLORS.goldFoil : meta.primary}`, opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 10, color: isClassic ? BASE_COLORS.goldFoil : meta.primary }}>IOE</Text>
                            <Text style={{ fontSize: 6, color: isClassic ? BASE_COLORS.goldFoil : meta.primary }}>EST 2006</Text>
                        </View>

                        <View style={styles.sigBlock}>
                            <View style={styles.sigLine} />
                            <Text style={[styles.sigRole, { color: BASE_COLORS.textPrimary, fontSize: 10 }]}>Evelyn Reed</Text>
                            <Text style={styles.sigRole}>Chief Quality Officer</Text>
                        </View>
                    </View>

                    {/* Footer Identifiers */}
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", gap: 30, marginTop: 20 }}>
                        <Text style={{ fontSize: 8, color: BASE_COLORS.textSecondary }}>Awarded Date: {data.completionDate}</Text>
                        <Text style={{ fontSize: 8, color: BASE_COLORS.textSecondary }}>Certification Number: {certId}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
