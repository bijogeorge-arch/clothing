'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black text-white py-20 px-6 md:px-12 overflow-hidden border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* SHOP */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/shop" className="hover:text-neon-lime transition-colors">Shop</Link></li>
                            <li><Link href="/returns" className="hover:text-neon-lime transition-colors">Returns</Link></li>
                            <li><a href="#" className="hover:text-neon-lime transition-colors">TikTok</a></li>
                            <li><Link href="/contact" className="hover:text-neon-lime transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* ABOUT */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">About</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/about" className="hover:text-neon-lime transition-colors">About Us</Link></li>
                            <li><Link href="/accessibility" className="hover:text-neon-lime transition-colors">Accessibility</Link></li>
                            <li><Link href="/timeframes" className="hover:text-neon-lime transition-colors">Timeframes</Link></li>
                            <li><Link href="/sitemap" className="hover:text-neon-lime transition-colors">Site Map</Link></li>
                        </ul>
                    </div>

                    {/* CUSTOMER CARE */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Customer Care</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/contact" className="hover:text-neon-lime transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-neon-lime transition-colors">Shipping / Return</Link></li>
                        </ul>
                    </div>

                    {/* NEWSLETTER */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h3>
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="ENTER YOUR EMAIL"
                                    className="bg-transparent border-b border-white/20 py-2 w-full focus:outline-none focus:border-neon-lime transition-colors font-mono text-sm"
                                />
                                <button className="absolute right-0 top-2 text-neon-lime font-bold text-xs hover:text-white transition-colors uppercase">
                                    Join
                                </button>
                            </div>

                            {/* Payment Icons */}
                            <div className="flex gap-2 mt-4">
                                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
                                <div className="w-10 h-6 bg-black border border-white rounded flex items-center justify-center text-[8px] font-bold">APPLE</div>
                                <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                                <div className="w-10 h-6 bg-blue-800 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-4 mt-4 text-gray-400">
                                <Facebook className="w-4 h-4 hover:text-neon-lime cursor-pointer" />
                                <Twitter className="w-4 h-4 hover:text-neon-lime cursor-pointer" />
                                <Instagram className="w-4 h-4 hover:text-neon-lime cursor-pointer" />
                                <Youtube className="w-4 h-4 hover:text-neon-lime cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-20"
                >
                    <h1 className="font-display text-[15vw] leading-none font-bold text-center tracking-tighter text-gray-800 select-none">
                        CHALCHITRA
                    </h1>
                    <div className="flex justify-between items-end mt-8 font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                        <p>© 2024 CHALCHITRA SYSTEM</p>
                        <p>COMPLETE EXPERIENCE</p>
                        <p>MUMBAI • TOKYO • NYC</p>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
