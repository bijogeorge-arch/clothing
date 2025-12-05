"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    images: string[];
    inventory?: number;
}

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const cart = useCart();
    const mainImage = product.images?.[0] || "/placeholder.jpg";

    return (
        <Link href={`/shop/${product.id}`} className="block">
            <motion.div
                className={cn("group relative flex flex-col gap-4 cursor-pointer", className)}
                initial="initial"
                whileHover="hover"
                animate="initial"
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 rounded-sm">
                    <motion.div
                        className="w-full h-full relative"
                        variants={{
                            initial: { scale: 1 },
                            hover: { scale: 1.05 },
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Image
                            src={mainImage}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>

                    {/* Quick Add Button - Slides up from bottom */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 p-4 z-10"
                        variants={{
                            initial: { y: "100%" },
                            hover: { y: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <button
                            className="w-full bg-white text-black py-3 px-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neon-lime transition-colors"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigation when clicking Quick Add
                                cart.addItem({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: mainImage,
                                    size: "M", // Default size for quick add
                                });
                            }}
                        >
                            <Plus size={18} />
                            Quick Add
                        </button>
                    </motion.div>

                    {/* Overlay for better text visibility if needed, or just style choice */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1">
                    <motion.h3
                        className="text-lg font-medium uppercase tracking-wide font-display"
                        variants={{
                            initial: { color: "#ffffff" },
                            hover: { color: "#ccff00" }, // neon-lime
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {product.name}
                    </motion.h3>
                    <div className="flex justify-between items-center text-neutral-400">
                        <span className="text-sm font-sans">{product.category}</span>
                        <span className="font-mono">₹{product.price}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
