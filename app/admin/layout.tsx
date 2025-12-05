import Link from "next/link"
import { LayoutDashboard, ShoppingCart, Package, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/admin/logout-button"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-black text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col fixed h-full">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tighter text-white">
                        CHALCHITRA <span className="text-xs text-zinc-500 block font-mono mt-1">COMMAND CENTER</span>
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                        Orders
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors">
                        <Package className="w-4 h-4" />
                        Products
                    </Link>
                    <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors">
                        <Users className="w-4 h-4" />
                        Customers
                    </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-800">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 ml-64 bg-black min-h-screen">
                {children}
            </main>
        </div>
    )
}
