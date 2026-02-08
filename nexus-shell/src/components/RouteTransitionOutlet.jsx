import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * RouteTransitionOutlet
 * Wraps the react-router-dom Outlet with Framer Motion transitions.
 * Prevents shell flicker by only animating the changing content.
 */
const RouteTransitionOutlet = () => {
    const location = useLocation();
    const outlet = useOutlet();
    const shouldReduceMotion = useReducedMotion();

    // Define the "Whoosh" animation variants
    const pageVariants = {
        initial: {
            opacity: 0,
            x: shouldReduceMotion ? 0 : 20,
            scale: shouldReduceMotion ? 1 : 0.98,
        },
        in: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        out: {
            opacity: 0,
            x: shouldReduceMotion ? 0 : -20,
            scale: shouldReduceMotion ? 1 : 1.02,
        },
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname.split('/')[1] || 'root'} // Key by top-level segment to control transition boundaries
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="w-full h-full"
            >
                {outlet}
            </motion.div>
        </AnimatePresence>
    );
};

export default RouteTransitionOutlet;
