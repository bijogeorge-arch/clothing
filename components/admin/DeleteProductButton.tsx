'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/actions/delete-product'
import { toast } from 'sonner'

interface DeleteProductButtonProps {
    productId: string
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return

        setIsDeleting(true)
        try {
            const result = await deleteProduct(productId)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Product deleted successfully')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Failed to delete product')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-400 hover:bg-red-950/50"
            title="Delete Product"
        >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
        </Button>
    )
}
