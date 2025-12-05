'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import CheckoutButton from './CheckoutButton'
import Image from 'next/image'

export default function CartSheet({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false)
    const cart = useCart()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg bg-black border-l border-white/10">
                <SheetHeader>
                    <SheetTitle className="font-display text-2xl uppercase tracking-tighter text-white">
                        Your Bag ({isMounted ? cart.count : 0})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full pt-8 pb-4">
                    {isMounted ? (
                        <>
                            <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-6">
                                {cart.items.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                                        <p>Your bag is empty.</p>
                                        <Button variant="outline" className="rounded-full" onClick={() => {
                                            // Close sheet logic if needed, or just let user click outside
                                        }}>
                                            Start Shopping
                                        </Button>
                                    </div>
                                ) : (
                                    cart.items.map((item) => (
                                        <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                            <div className="relative w-20 h-24 bg-neutral-900 rounded-md overflow-hidden shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-medium text-white">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="font-mono text-sm">₹{item.price.toFixed(2)}</p>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => cart.removeItem(item.id, item.size)}
                                                            className="text-muted-foreground hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.items.length > 0 && (
                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <div className="flex items-center justify-between font-medium text-lg">
                                        <span>Total</span>
                                        <span className="font-mono">₹{cart.total.toFixed(2)}</span>
                                    </div>
                                    <CheckoutButton />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                            <p>Loading cart...</p>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
