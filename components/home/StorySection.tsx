import Image from 'next/image'

export function StorySection() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
                    <Image
                        src="https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1587&auto=format&fit=crop"
                        alt="Our Story"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-8">
                        Our <span className="text-neon-purple">Story</span>
                    </h2>

                    <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                        <p>
                            CHALCHITRA is a streetwear brand effectively blending modern aesthetics with traditional roots. Our model is brand & always-fresh drops created for creative souls. We sell clothing remnants meant for bold expression.
                        </p>
                        <p>
                            Injecting technology into your daily wear, Chalchitra means "Moving Pictures" - we designed building clothes for women and men who aren't afraid to be seen.
                        </p>
                        <p>
                            Waste no more time. Be iconic. Be cinematic. In memories we remember the tropes automotion and of chaos, building something lasting the time and a knowledge.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
