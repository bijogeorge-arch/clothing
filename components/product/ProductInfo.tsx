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

        <div className="flex flex-col gap-8 p-6 md:p-12 md:sticky md:top-0 h-fit min-h-screen justify-center pb-32 md:pb-12">
            <div className="space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none"
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

            {/* Desktop Button */}
            <div className="hidden md:block pt-12">
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

            {/* Mobile Sticky Bar */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-background/95 backdrop-blur-xl border-t border-white/10 p-4 md:hidden flex items-center justify-between gap-4 safe-area-bottom">
                <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Price</span>
                    <span className="font-mono text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex-1">
                    <AddToCartButton
                        product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0]
                        }}
                        selectedSize={selectedSize}
                        className="h-12 text-sm"
                    />
                </div>
            </div>
        </div>
    )

}
