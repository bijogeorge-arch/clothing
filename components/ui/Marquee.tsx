"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import React, { useRef } from "react";

interface MarqueeProps {
    children: React.ReactNode;
    baseVelocity?: number;
    className?: string;
}

export function Marquee({ children, baseVelocity = 100, className }: MarqueeProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Wrap logic to ensure infinite scroll
    const wrap = (min: number, max: number, v: number) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    // We have 4 copies, so we wrap every 25% (1/4)
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        // Move in negative direction by default for left scroll
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={cn("overflow-hidden whitespace-nowrap flex flex-nowrap", className)}>
            <motion.div className="flex flex-nowrap gap-8" style={{ x }}>
                {/* Render children multiple times to ensure coverage */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex shrink-0 items-center gap-8 min-w-max">
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Simpler version if the velocity one is too complex or buggy for this specific need
// But the user asked for "Framer Motion" specifically, and velocity scroll is a nice touch for "Wear the Noise".
// Actually, for the "Featured Category" marquee, a simple constant speed is usually better.
// Let's stick to a simpler constant speed marquee for the category band.

export function SimpleMarquee({ children, duration = 20, className }: { children: React.ReactNode, duration?: number, className?: string }) {
    return (
        <div className={cn("overflow-hidden flex", className)}>
            <motion.div
                className="flex shrink-0 gap-8 min-w-full"
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {/* We need enough copies to fill the screen and loop smoothly. 
            Ideally we'd measure width, but for now let's just duplicate enough times. 
            The parent container needs to be wide enough. 
         */}
                <div className="flex gap-8 items-center pr-8">
                    {children}
                </div>
                <div className="flex gap-8 items-center pr-8">
                    {children}
                </div>
            </motion.div>
            <motion.div
                className="flex shrink-0 gap-8 min-w-full"
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <div className="flex gap-8 items-center pr-8">
                    {children}
                </div>
                <div className="flex gap-8 items-center pr-8">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
