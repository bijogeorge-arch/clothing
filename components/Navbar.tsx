'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CartSheet from '@/components/cart/CartSheet'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { User as SupabaseUser } from '@supabase/supabase-js'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavbarProps {
    user?: SupabaseUser | null
}

export default function Navbar({ user }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setIsOpen(false)
        router.push('/login')
        router.refresh()
    }

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1] as any
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1] as any
            }
        }
    }

    const linkVariants = {
        closed: { y: 20, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.3 + i * 0.1,
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1] as any
            }
        })
    }

    const menuItems = [
        { label: 'New Arrivals', href: '/shop' },
        { label: 'Streetwear', href: '/shop?category=streetwear' },
        { label: 'Accessories', href: '/shop?category=accessories' },
        { label: 'Editorial', href: '/about' },
    ]

    return (
        <>
            <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
                {/* Center Pill */}
                <div className="bg-background/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 pointer-events-auto shadow-2xl">
                    <Link href="/" className="font-display font-bold text-xl tracking-tighter">
                        CHALCHITRA
                    </Link>

                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
                        <Link href="/collections" className="hover:text-foreground transition-colors">Collection</Link>
                        <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="neon"
                            size="sm"
                            className="rounded-full ml-2 font-bold md:hidden"
                            onClick={() => setIsOpen(true)}
                        >
                            MENU
                        </Button>
                    </div>
                </div>

                {/* Right Profile Widget */}
                <div className="absolute right-6 top-0 pointer-events-auto flex flex-col items-end gap-2">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10 border border-white/10">
                                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
                                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-black/90 border-white/10 text-white backdrop-blur-xl" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem asChild>
                                    <Link href="/account" className="cursor-pointer hover:bg-white/10 focus:bg-white/10">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <CartSheet>
                                        <span className="w-full cursor-pointer hover:bg-white/10 focus:bg-white/10 flex items-center justify-between">
                                            Cart
                                            <ShoppingBag className="w-4 h-4 ml-2" />
                                        </span>
                                    </CartSheet>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-white/10 focus:bg-white/10 text-red-500 focus:text-red-500">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 bg-white text-black hover:bg-gray-200">
                                <User className="w-5 h-5" />
                            </Button>
                        </Link>
                    )}

                    {/* Cart Button (Always visible if not in dropdown, or maybe just keep it in dropdown? Image shows a box) */}
                    {/* The image shows a dark box with "Profile" and "Cart" links under the avatar, which implies a dropdown or a persistent widget. 
                        I'll stick with the dropdown for now as it's cleaner. 
                        But I should probably add a separate Cart button if the user is not logged in or just always.
                        Let's add a standalone Cart button below the profile if we want to match the "verticality" or just keep it simple.
                        Actually, let's just keep the Cart in the dropdown for logged in users, or maybe add a Cart button next to profile.
                    */}
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-8 right-8 text-white hover:text-neon-lime"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </Button>

                        <div className="flex flex-col items-center gap-8">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    custom={i}
                                    variants={linkVariants}
                                >
                                    <Link
                                        href={item.href}
                                        className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 hover:to-neon-lime transition-all duration-300 uppercase tracking-tighter"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
