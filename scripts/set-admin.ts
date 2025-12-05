import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

const TARGET_EMAIL = 'clutchy890@gmail.com'

async function setAdmin() {
    console.log(`\n🔍 Looking for user: ${TARGET_EMAIL}...`)

    // 1. Find the user to get their ID
    // Note: listUsers defaults to page 1, perPage 50. Should be enough for this dev scenario.
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
        console.error('❌ Error listing users:', listError.message)
        return
    }

    const user = users.find(u => u.email === TARGET_EMAIL)

    if (!user) {
        console.error(`❌ User ${TARGET_EMAIL} not found in Supabase Auth!`)
        console.log('   Please sign up first or check the email spelling.')
        return
    }

    console.log(`✅ Found user ID: ${user.id}`)
    console.log(`   Current Role: ${user.app_metadata?.role || 'none'}`)
    console.log(`⚡ Updating app_metadata to { role: 'admin' }...`)

    // 2. Update user metadata
    const { data, error: updateError } = await supabase.auth.admin.updateUserById(
        user.id,
        { app_metadata: { role: 'admin' } }
    )

    if (updateError) {
        console.error('❌ Error updating user:', updateError.message)
        return
    }

    console.log('\n🎉 Success! User promoted to Admin.')
    console.log('   New app_metadata:', data.user.app_metadata)
    console.log('\n👉 You can now log out and log back in to refresh your session.')
}

setAdmin()
