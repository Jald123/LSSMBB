import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppModeProvider } from "@/context/AppModeContext";
import { Suspense } from "react";
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
                <ThemeProvider>
                    <Suspense fallback={null}>
                        <AppModeProvider>
                            {children}
                        </AppModeProvider>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
