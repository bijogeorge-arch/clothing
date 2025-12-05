import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { requireAdmin } from '@/lib/admin-auth'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

export default async function ProductsPage() {
    await requireAdmin()
    const supabase = await createClient()

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching products:', error)
        return <div className="text-white">Error loading products</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Products</h1>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border border-zinc-800 bg-zinc-900">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                            <TableHead className="text-zinc-400">Name</TableHead>
                            <TableHead className="text-zinc-400">Category</TableHead>
                            <TableHead className="text-zinc-400">Price</TableHead>
                            <TableHead className="text-zinc-400">Inventory</TableHead>
                            <TableHead className="text-right text-zinc-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products?.map((product) => (
                                <TableRow key={product.id} className="border-zinc-800 hover:bg-zinc-800/50 text-zinc-300">
                                    <TableCell className="font-medium text-white">{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>₹{product.price}</TableCell>
                                    <TableCell>{product.inventory}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/shop/${product.id}`}>View</Link>
                                            </Button>
                                            <DeleteProductButton productId={product.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
