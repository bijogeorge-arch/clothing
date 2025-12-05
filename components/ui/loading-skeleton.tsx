import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}

export function PageHeaderSkeleton() {
    return (
        <div className="space-y-4 mb-8">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-4 w-[500px]" />
        </div>
    )
}

export function TableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[100px]" />
            </div>
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
        </div>
    )
}
