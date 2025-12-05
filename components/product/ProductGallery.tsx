'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
    images: string[]
}

export default function ProductGallery({ images = [] }: ProductGalleryProps) {
    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-[3/4] bg-neutral-900 flex items-center justify-center text-neutral-500">
                No images available
            </div>
        )
    }
    const containerRef = useRef<HTMLDivElement>(null)

    // For desktop scroll animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    return (
        <>
            {/* Mobile: Horizontal Swipe */}
            <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 p-4 no-scrollbar">
                {images.map((src, i) => (
                    <div key={i} className="snap-center shrink-0 w-[85vw] aspect-[3/4] relative rounded-lg overflow-hidden">
                        <Image
                            src={src}
                            alt={`Product view ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Desktop: Vertical "Film Strip" with Fade */}
            <div ref={containerRef} className="hidden md:block relative h-[300vh]">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    {images.map((src, i) => {
                        // Calculate opacity based on scroll progress
                        // 0 -> 1 range divided by number of images
                        const step = 1 / images.length
                        const start = i * step
                        const end = (i + 1) * step

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(
                            scrollYProgress,
                            [start, start + step * 0.5, end],
                            [i === 0 ? 1 : 0, 1, i === images.length - 1 ? 1 : 0]
                        )

                        // Scale effect for "film reel" feel
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const scale = useTransform(
                            scrollYProgress,
                            [start, end],
                            [1.1, 1]
                        )

                        return (
                            <motion.div
                                key={i}
                                style={{ opacity, scale, zIndex: i }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={src}
                                        alt={`Product view ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={i === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
