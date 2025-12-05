'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCart, CartItem } from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
    product: {
        id: string
        name: string
        price: number
        image: string
    }
    selectedSize: string | null
    className?: string
}

export default function AddToCartButton({ product, selectedSize, className }: AddToCartButtonProps) {
    const addItem = useCart((state) => state.addItem)
    const [status, setStatus] = useState<'idle' | 'success'>('idle')

    const handleAddToCart = () => {
        if (!selectedSize) return

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
        })

        setStatus('success')
        toast.success("Item added to cart")
        setTimeout(() => setStatus('idle'), 2000)
    }

    return (
        <motion.button
            className={cn(
                "relative w-full h-14 bg-white text-black font-display font-bold text-xl uppercase tracking-tighter overflow-hidden",
                !selectedSize && "opacity-50 cursor-not-allowed",
                className
            )}
            onClick={handleAddToCart}
            disabled={!selectedSize}
            whileTap={selectedSize ? { scale: 0.95 } : {}}
        >
            <AnimatePresence mode="wait">
                {status === 'idle' ? (
                    <motion.div
                        key="idle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <span>Add to Cart</span>
                        <ShoppingBag className="w-5 h-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-green-600"
                    >
                        <span>Secured</span>
                        <Check className="w-6 h-6" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Neon Glow Effect on Hover */}
            <div className="absolute inset-0 bg-neon-lime/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.button>
    )
}
