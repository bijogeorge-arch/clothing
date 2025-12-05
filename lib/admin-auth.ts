import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Enforces admin access for Server Components.
 * Checks both the session app_metadata and the public.profiles table.
 */
export async function requireAdmin() {
    const supabase = await createClient()

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    // 1. Check app_metadata (Fast, Session-based)
    // We log a warning if it doesn't match, but we rely on the DB check for the final decision
    // as per the "double-check" requirement.
    if (user.app_metadata?.role !== 'admin') {
        console.warn(`[Admin Auth] User ${user.id} missing admin role in app_metadata. Verifying with DB...`)
    }

    // 2. Check public.profiles (Source of Truth)
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profileError) {
        console.error(`[Admin Auth] Error fetching profile for user ${user.id}:`, profileError)
        redirect('/')
    }

    if (!profile || profile.role !== 'admin') {
        console.warn(`[Admin Auth] Access denied. User ${user.id} is not an admin in profiles table.`)
        redirect('/')
    }

    return user
}
