'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { productSchema, ProductFormValues } from '@/lib/schemas'

export async function createProduct(data: ProductFormValues) {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { error: 'Unauthorized' }
    }

    // Validate data
    const result = productSchema.safeParse(data)
    if (!result.success) {
        return { error: 'Invalid form data' }
    }

    const { name, description, price, category, inventory, images, sizes } = result.data

    const { error } = await supabase.from('products').insert({
        name,
        description,
        price,
        category,
        inventory,
        images,
        sizes,
    })

    if (error) {
        console.error('Error creating product:', error)
        return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/admin/products')

    return { success: true }
}
