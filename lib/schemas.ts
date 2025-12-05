import { z } from 'zod'

export const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.coerce.number().min(0, 'Price must be a positive number'),
    category: z.string().min(1, 'Category is required'),
    inventory: z.coerce.number().int().min(0, 'Inventory must be a positive integer'),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    sizes: z.array(z.string()).min(1, 'At least one size is required'),
})

export type ProductFormValues = z.infer<typeof productSchema>
