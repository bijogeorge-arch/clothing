import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const supabase = await createClient()
    const { data: product } = await supabase.from('products').select('*').eq('id', id).single()

    if (!product) {
        return {
            title: 'Product Not Found',
        }
    }

    return {
        title: `${product.name} | Chalchitra`,
        description: product.description,
        openGraph: {
            images: product.images && product.images.length > 0 ? [product.images[0]] : [],
        },
    }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    console.log('Fetching product with ID:', id)

    const supabase = await createClient()
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching product:', error)
    }

    console.log('Product data:', product)

    if (!product) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Gallery */}
                <div className="relative">
                    <ProductGallery images={product.images || []} />
                </div>

                {/* Right: Info */}
                <div className="relative">
                    <ProductInfo product={product} />
                </div>
            </div>
        </main>
    )
}
