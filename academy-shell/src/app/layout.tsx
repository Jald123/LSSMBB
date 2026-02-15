import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppModeProvider } from "@/context/AppModeContext";
import { ToastProvider } from "@/components/ui/Toast";
import { Suspense } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nexus Academy | Lean Six Sigma Interactive Platform",
    description: "Production-grade project execution and learning platform.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <OfflineBanner />
                <ThemeProvider>
                    <Suspense fallback={null}>
                        <ToastProvider>
                            <AppModeProvider>
                                <PageTransition>
                                    {children}
                                </PageTransition>
                                <ScrollToTop />
                            </AppModeProvider>
                        </ToastProvider>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
