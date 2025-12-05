"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const textXLeft = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);
    const textXRight = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    return (
        <div ref={containerRef} className="relative h-[130vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* Background Image */}
                <motion.div
                    style={{ scale: imageScale }}
                    className="absolute inset-0 z-0"
                >
                    {/* Placeholder for Hero Image - using a dark, gritty street style image */}
                    {/* Placeholder for Hero Image - using a dark, gritty street style image */}
                    <Image
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                {/* Hero Text */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full mix-blend-overlay pointer-events-none">
                    <motion.h1
                        className="text-[10vw] md:text-[12vw] leading-[0.85] font-display font-black text-white whitespace-nowrap tracking-tighter"
                        style={{ x: textXLeft, opacity: textOpacity }}
                    >
                        WEAR
                    </motion.h1>
                    <motion.h1
                        className="text-[10vw] md:text-[12vw] leading-[0.85] font-display font-black text-white whitespace-nowrap tracking-tighter"
                        style={{ x: textXRight, opacity: textOpacity }}
                    >
                        THE NOISE
                    </motion.h1>
                </div>

                {/* Magnetic Button */}
                <div className="absolute bottom-10 md:bottom-20 z-20">
                    <MagneticButton>
                        SHOP NOW
                    </MagneticButton>
                </div>
            </div>
        </div>
    );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const { left, top, width, height } = rect;
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            setPosition({ x: x * 0.3, y: y * 0.3 });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="group relative px-8 py-4 bg-neon-lime text-black font-bold text-xl rounded-full overflow-hidden border-2 border-transparent hover:border-white transition-colors"
        >
            <span className="relative z-10 flex items-center gap-2">
                {children} <ArrowDownRight className="group-hover:-rotate-45 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
        </motion.button>
    )
}
