import { PageHeaderSkeleton, TableSkeleton } from "@/components/ui/loading-skeleton"

export default function AccountLoading() {
    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <PageHeaderSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                <div className="space-y-4">
                    {/* Sidebar Skeleton */}
                    <div className="h-10 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-10 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-10 w-full bg-zinc-800 rounded animate-pulse" />
                </div>
                <div>
                    <TableSkeleton />
                </div>
            </div>
        </div>
    )
}
