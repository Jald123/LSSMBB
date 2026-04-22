import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { Suspense } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { NexusProvider } from "@/context/NexusContext";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-orbitron" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
    title: "Nexus Academy | Lean Six Sigma Interactive Platform",
    description: "Production-grade project execution and learning platform for Operational Excellence professionals. Master Lean Six Sigma with interactive tools and AI-driven guidance.",
    keywords: ["Lean Six Sigma", "LSS", "DMAIC", "Operational Excellence", "Continuous Improvement", "Project Management", "White Belt", "Yellow Belt", "Green Belt", "Black Belt"],
    authors: [{ name: "Nexus Academy Team" }],
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#020617",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
            <body className="font-sans bg-background text-foreground antialiased selection:bg-nexus-cyan/30">
                <OfflineBanner />
                <ThemeProvider>
                    <Suspense fallback={null}>
                        <ToastProvider>
                            <NexusProvider>
                                <AppShell>
                                    <PageTransition>
                                        {children}
                                    </PageTransition>
                                </AppShell>
                                <ScrollToTop />
                            </NexusProvider>
                        </ToastProvider>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
