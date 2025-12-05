"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProductCard, Product } from "@/components/products/ProductCard";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <AnimatePresence mode="popLayout">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.05, // Stagger effect
                            ease: "easeOut"
                        }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </AnimatePresence>

            {products.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center text-neutral-500"
                >
                    <p className="text-lg font-display uppercase tracking-wide">No products found</p>
                    <p className="text-sm font-sans mt-2">Try adjusting your filters</p>
                </motion.div>
            )}
        </motion.div>
    );
}
