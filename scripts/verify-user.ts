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

async function verifyUser() {
    console.log(`Checking user: ${TARGET_EMAIL}`)
    const { data: { users }, error } = await supabase.auth.admin.listUsers()

    if (error) {
        console.error('Error listing users:', error)
        return
    }

    const user = users.find(u => u.email === TARGET_EMAIL)

    if (!user) {
        console.error('User not found')
        return
    }

    console.log('User ID:', user.id)
    console.log('App Metadata:', JSON.stringify(user.app_metadata, null, 2))
    console.log('User Metadata:', JSON.stringify(user.user_metadata, null, 2))
}

verifyUser()
