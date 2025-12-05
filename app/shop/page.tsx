import { createClient } from "@/utils/supabase/server";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Product } from "@/components/products/ProductCard";

export const dynamic = 'force-dynamic';

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const supabase = await createClient();

    // Parse filters
    const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
    const minPrice = typeof resolvedSearchParams.minPrice === 'string' ? Number(resolvedSearchParams.minPrice) : 0;
    const maxPrice = typeof resolvedSearchParams.maxPrice === 'string' ? Number(resolvedSearchParams.maxPrice) : 100000;

    // Build query
    let query = supabase.from('products').select('*');

    if (category && category !== 'All') {
        // Case-insensitive match
        query = query.ilike('category', category);
    }

    query = query.gte('price', minPrice).lte('price', maxPrice);

    // Order by newest
    query = query.order('created_at', { ascending: false });

    const { data: products, error } = await query;

    console.log('Shop Page Debug:', {
        category,
        minPrice,
        maxPrice,
        productsCount: products?.length,
        error
    });

    if (error) {
        console.error("Error fetching products:", error);
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col mb-12">
                    <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tighter font-bold mb-4">
                        Shop <span className="text-neon-lime">Collection</span>
                    </h1>
                    <p className="text-neutral-400 max-w-xl">
                        Explore our latest drops. Limited edition streetwear designed for the digital age.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0 z-20">
                        <FilterSidebar />
                    </aside>

                    {/* Main Grid */}
                    <main className="flex-1">
                        <ProductGrid products={(products as Product[]) || []} />
                    </main>
                </div>
            </div>
        </div>
    );
}
