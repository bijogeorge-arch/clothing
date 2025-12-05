import { HeroSection } from "@/components/home/HeroSection";
import { Marquee } from "@/components/ui/Marquee";
import { ProductCard } from "@/components/products/ProductCard";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { StorySection } from "@/components/home/StorySection";
import { JournalSection } from "@/components/home/JournalSection";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .limit(4)
    .order("created_at", { ascending: false });

  const featuredProducts = products || [];

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <HeroSection />

      <div className="py-8 border-y border-white/10 bg-black/50 backdrop-blur-sm">
        <Marquee className="text-4xl md:text-6xl font-display font-bold" baseVelocity={5}>
          <span className="text-white mx-8">NEW DROP</span>
          <span className="text-neon-lime mx-8">CHALCHITRA VOL.1</span>
          <span className="text-white mx-8">LIMITED EDITION</span>
          <span className="text-neon-purple mx-8">WEAR THE NOISE</span>
        </Marquee>
      </div>

      <FeaturedCollections />

      <section className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
            Latest <span className="text-neon-purple">Arrivals</span>
          </h2>
          <button className="hidden md:block text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-neon-lime hover:border-neon-lime transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <button className="text-sm uppercase tracking-widest border-b border-white pb-1">
            View All
          </button>
        </div>
      </section>

      <StorySection />

      <JournalSection />
    </div>
  );
}
