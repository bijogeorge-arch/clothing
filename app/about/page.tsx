"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { Film, Globe, Timer } from "lucide-react";
import { useRef } from "react";

const manifestoText = "WE DO NOT SELL CLOTHES. WE SELL ATMOSPHERE.";

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <div ref={containerRef} className="bg-background text-foreground overflow-hidden">
            {/* 1. The Manifesto - Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-4 md:px-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center z-10">
                    <motion.h1
                        className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.05 } },
                        }}
                    >
                        {manifestoText.split("").map((char, i) => (
                            <motion.span key={i} variants={letterVariants} className="inline-block">
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="mt-8 text-xl md:text-2xl text-muted-foreground font-light tracking-widest uppercase"
                    >
                        Est. 2024 • Kota, Rajasthan
                    </motion.p>
                </div>

                {/* Background texture/noise could go here */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </section>

            {/* 2. The Origins - Split Screen */}
            <section className="py-24 md:py-32 px-4 md:px-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="relative aspect-[3/4] md:aspect-square w-full overflow-hidden rounded-sm"
                    >
                        <motion.div style={{ y: yParallax }} className="absolute inset-0 h-[120%] w-full">
                            <Image
                                src="https://images.unsplash.com/photo-1517146783983-418c681b56c5?q=80&w=2070&auto=format&fit=crop"
                                alt="Underground Origins"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                            Born in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Underground</span>
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                            <p>
                                Chalchitra wasn&apos;t born in a boardroom. It started in the narrow, electric streets of Kota. Between the neon signs and the concrete decay, we found a rhythm.
                            </p>
                            <p>
                                We saw a gap between high fashion and street reality. We wanted to create armor for the modern creative—pieces that speak before you do.
                            </p>
                            <p>
                                Every stitch tells a story of rebellion, art, and the cinematic beauty of everyday chaos.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. The Process - 3 Column Grid */}
            <section className="py-24 md:py-32 px-4 md:px-12 bg-secondary/5">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16"
                    >
                        The Method
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Globe,
                                title: "Ethical Sourcing",
                                desc: "We don't exploit. We collaborate. Materials sourced with respect for the planet and the people.",
                            },
                            {
                                icon: Timer,
                                title: "Limited Drops",
                                desc: "Mass production is the enemy of art. Small batches ensure exclusivity and quality control.",
                            },
                            {
                                icon: Film,
                                title: "Cinematic Design",
                                desc: "Inspired by the visual language of cinema. High contrast, deep shadows, and narrative-driven cuts.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="bg-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-lg hover:border-white/20 transition-colors duration-300"
                            >
                                <div className="mb-6 inline-block p-4 bg-white/5 rounded-full">
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold uppercase mb-4">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
