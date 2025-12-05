import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const TARGET_EMAIL = 'clutchy890@gmail.com'

async function checkAndFixProfile() {
    console.log(`Checking profile for: ${TARGET_EMAIL}`)

    // 1. Get User ID
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
        console.error('Error listing users:', listError)
        return
    }
    const user = users.find(u => u.email === TARGET_EMAIL)
    if (!user) {
        console.error('User not found in auth.users')
        return
    }
    console.log(`User ID: ${user.id}`)

    // 2. Check public.profiles
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (profileError) {
        console.error('Error fetching profile:', profileError)
        // If profile doesn't exist, we might need to create it? 
        // Usually triggers create it, but let's see.
    } else {
        console.log('Current Profile:', profile)
    }

    if (!profile || profile.role !== 'admin') {
        console.log('⚡ Profile role is NOT admin. Updating public.profiles...')

        const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email, // Assuming email is in profiles, if not it will be ignored or error if strict
                role: 'admin'
            })
            .select()

        if (updateError) {
            console.error('❌ Error updating profile:', updateError)
        } else {
            console.log('✅ Profile updated:', updatedProfile)
        }
    } else {
        console.log('✅ Profile role is already admin.')
    }
}

checkAndFixProfile()
