import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const USER_ID = '96e4aeaa-ad48-4aff-8253-587a9e822205'

async function updateProfile() {
    console.log(`Updating profile for ID: ${USER_ID}`)

    const { data, error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', USER_ID)
        .select()

    if (error) {
        console.error('Error updating profile:', error)
    } else {
        console.log('Success! Updated profile:', data)
    }
}

updateProfile()
