"use client"

import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-900"
            onClick={handleLogout}
        >
            <LogOut className="w-4 h-4" />
            Logout
        </Button>
    )
}
