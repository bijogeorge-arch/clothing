'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AddToCartButton from './AddToCartButton'
import { cn } from '@/lib/utils'

interface ProductInfoProps {
    product: {
        id: string
        name: string
        price: number
        description?: string
        images: string[] // We need the first image for the cart
    }
}

const SIZES = ['S', 'M', 'L', 'XL']

export default function ProductInfo({ product }: ProductInfoProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)

    return (
        <div className="flex flex-col gap-8 p-6 md:p-12 md:sticky md:top-0 h-fit min-h-screen justify-center">
            <div className="space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none"
                >
                    {product.name}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-mono text-xl md:text-2xl text-muted-foreground"
                >
                    ${product.price.toFixed(2)}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-invert max-w-none text-gray-400"
            >
                <p>{product.description}</p>
            </motion.div>

            <div className="space-y-4">
                <span className="font-mono text-sm text-muted-foreground uppercase">Select Size</span>
                <div className="flex gap-4">
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                                "w-12 h-12 border border-white/20 rounded-full font-mono transition-all duration-300 flex items-center justify-center",
                                selectedSize === size
                                    ? "bg-neon-lime text-black border-neon-lime shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                                    : "hover:border-white hover:bg-white/5"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-8 md:pt-12 sticky bottom-0 md:static bg-black/80 backdrop-blur-md md:bg-transparent p-4 md:p-0 -mx-6 md:mx-0 border-t border-white/10 md:border-none z-10">
                <AddToCartButton
                    product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0]
                    }}
                    selectedSize={selectedSize}
                />
            </div>
        </div>
    )
}
