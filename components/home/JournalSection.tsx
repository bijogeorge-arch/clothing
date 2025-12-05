import Link from 'next/link'
import Image from 'next/image'

const JOURNAL_POSTS = [
    {
        id: 1,
        title: "Streetwear culture during the latest collection.",
        date: "May 18, 2024",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
        slug: "streetwear-culture"
    },
    {
        id: 2,
        title: "Lorem ipsum on-line with craftily seasonable manner, increased and lived for dresity or gridors.",
        date: "May 16, 2024",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
        slug: "lorem-ipsum"
    },
    {
        id: 3,
        title: "The Chalchitra journal: a guide and early to look at collections, former and bootlegs.",
        date: "May 14, 2024",
        image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1395&auto=format&fit=crop",
        slug: "chalchitra-journal"
    }
]

export function JournalSection() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
                    The Chalchitra <span className="text-neon-purple">Journal</span>
                </h2>
                <Link href="/journal" className="hidden md:block text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-neon-lime hover:border-neon-lime transition-colors">
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {JOURNAL_POSTS.map((post) => (
                    <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
                        <div className="relative h-[300px] overflow-hidden rounded-lg mb-6">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                            <div className="absolute top-4 left-4 bg-neon-lime text-black text-xs font-bold px-2 py-1 uppercase">
                                {post.date}
                            </div>
                        </div>
                        <h3 className="text-xl font-medium text-gray-300 group-hover:text-white transition-colors leading-snug">
                            {post.title}
                        </h3>
                    </Link>
                ))}
            </div>

            <div className="mt-12 md:hidden flex justify-center">
                <Link href="/journal" className="text-sm uppercase tracking-widest border-b border-white pb-1">
                    View All
                </Link>
            </div>
        </section>
    )
}
