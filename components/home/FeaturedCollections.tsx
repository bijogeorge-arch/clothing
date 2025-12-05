import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function FeaturedCollections() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter">
                    Featured <span className="text-neon-purple">Collections</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Men's Collection */}
                <div className="group relative h-[600px] overflow-hidden rounded-lg bg-zinc-900">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1587&auto=format&fit=crop')" }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tighter">
                            MEN'S COLLECTION
                        </h3>
                        <Link href="/shop?category=men">
                            <Button className="bg-neon-lime text-black hover:bg-white hover:text-black font-bold rounded-full px-8 py-6 text-lg transition-all duration-300">
                                SHOP NOW <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Women's Collection */}
                <div className="group relative h-[600px] overflow-hidden rounded-lg bg-zinc-900">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=1587&auto=format&fit=crop')" }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tighter">
                            WOMEN'S COLLECTION
                        </h3>
                        <Link href="/shop?category=women">
                            <Button className="bg-neon-lime text-black hover:bg-white hover:text-black font-bold rounded-full px-8 py-6 text-lg transition-all duration-300">
                                SHOP NOW <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
