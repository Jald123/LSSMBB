"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

interface PageTransitionProps {
    children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const pathname = usePathname();

    // Determine direction based on pathname depth or specific routes
    // For simplicity, we can use a standard slide if complexity grows
    const variants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
