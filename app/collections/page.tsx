"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const collections = [
    {
        id: "neon-tokyo",
        name: "Neon Tokyo",
        description: "Cyberpunk aesthetics for the modern ronin.",
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop",
        color: "text-cyan-400", // Neon accent
    },
    {
        id: "the-void",
        name: "The Void",
        description: "Absolute minimalism. Embrace the darkness.",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2068&auto=format&fit=crop",
        color: "text-white", // Stark white against black
    },
    {
        id: "static-noise",
        name: "Static Noise",
        description: "Distressed fabrics and glitch patterns.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
        color: "text-rose-500", // Glitch red
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const, // Custom ease for "cinematic" feel
        },
    },
};

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12 md:mb-20 text-center"
            >
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-4">
                    Collections
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                    Curated drops from the underground. Limited availability.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[500px]"
            >
                {collections.map((collection, index) => (
                    <motion.div
                        key={collection.id}
                        variants={cardVariants}
                        className={`relative group overflow-hidden rounded-lg cursor-pointer ${index === 1 ? "md:col-span-2 lg:col-span-1" : "" // Just adding some grid variation
                            }`}
                    >
                        <Link href={`/shop?category=${collection.name}`} className="block h-full w-full">
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full w-full relative"
                                >
                                    <Image
                                        src={collection.image}
                                        alt={collection.name}
                                        fill
                                        className="object-cover transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                                <motion.h2
                                    className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 transition-colors duration-300 ${collection.color} opacity-90 group-hover:opacity-100`}
                                >
                                    {collection.name}
                                </motion.h2>
                                <p className="text-white/80 text-lg font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    {collection.description}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
