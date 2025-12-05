'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

function ReturnContent() {
    const searchParams = useSearchParams();
    const clearCart = useCart((state) => state.clearCart);
    const [status, setStatus] = useState<'success' | 'canceled' | null>(null);

    useEffect(() => {
        const success = searchParams.get('success');
        const canceled = searchParams.get('canceled');

        if (success) {
            setStatus('success');
            clearCart();

            // Cinematic Confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        } else if (canceled) {
            setStatus('canceled');
        }
    }, [searchParams, clearCart]);

    if (!status) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-lg w-full text-center space-y-8 p-8 border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl rounded-2xl shadow-2xl"
        >
            {status === 'success' ? (
                <>
                    <div className="space-y-2">
                        <h1 className="text-6xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-lime-300 via-lime-400 to-green-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                            ORDER<br />CONFIRMED
                        </h1>
                        <p className="text-zinc-400 text-lg font-mono tracking-wide">
                            YOUR GEAR IS SECURED.
                        </p>
                    </div>
                    <Button asChild className="w-full h-12 text-lg font-bold bg-lime-400 text-black hover:bg-lime-500 transition-all duration-300 hover:scale-[1.02]">
                        <Link href="/shop">CONTINUE SHOPPING</Link>
                    </Button>
                </>
            ) : (
                <>
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            PAYMENT<br />FAILED
                        </h1>
                        <p className="text-zinc-400 text-lg font-mono tracking-wide">
                            TRANSACTION INTERRUPTED.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="w-full h-12 text-lg font-bold border-zinc-800 text-white hover:bg-zinc-900 hover:text-white transition-all duration-300">
                        <Link href="/cart">RETURN TO CART</Link>
                    </Button>
                </>
            )}
        </motion.div>
    );
}

export default function ReturnPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-4 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />

            <Suspense fallback={<div className="text-lime-400 font-mono animate-pulse">LOADING_TRANSACTION_STATUS...</div>}>
                <ReturnContent />
            </Suspense>
        </div>
    )
}
