import { PageHeaderSkeleton, ProductGridSkeleton } from "@/components/ui/loading-skeleton"

export default function ShopLoading() {
    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <PageHeaderSkeleton />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 space-y-6">
                    {/* Filter Skeleton */}
                    <div className="space-y-4">
                        <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                    </div>
                </div>
                <div className="flex-1">
                    <ProductGridSkeleton />
                </div>
            </div>
        </div>
    )
}
