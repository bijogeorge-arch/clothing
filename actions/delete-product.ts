'use server'

import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(productId: string) {
    // 1. Verify User is Admin using standard client (checks session)
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'Unauthorized' }
    }

    if (user.app_metadata.role !== 'admin') {
        return { error: 'Forbidden: Admin access required' }
    }

    // 2. Perform Delete using Service Role (Bypass RLS)
    // We use the service role key to ensure we can delete regardless of RLS policies
    // since we've already manually verified the user is an admin above.
    const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )

    const { error } = await supabaseAdmin
        .from('products')
        .delete()
        .eq('id', productId)

    if (error) {
        console.error('Error deleting product:', error)
        return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/admin/products')

    return { success: true }
}
