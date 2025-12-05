import { requireAdmin } from "@/lib/admin-auth"
import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, Users } from "lucide-react"

export default async function AdminDashboard() {
    // Verify admin access
    await requireAdmin()

    const supabase = await createClient()

    // Fetch stats
    // 1. Total Revenue
    const { data: orders } = await supabase.from('orders').select('amount')
    const totalRevenue = orders?.reduce((acc: number, order: { amount: number }) => acc + order.amount, 0) || 0

    // 2. Active Orders (status != 'delivered' AND status != 'cancelled')
    const { count: activeOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'delivered')
        .neq('status', 'cancelled')

    // 3. Total Customers (count profiles)
    const { count: totalCustomers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(totalRevenue / 100).toFixed(2)}</div>
                        <p className="text-xs text-zinc-500">All time revenue</p>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Active Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeOrders || 0}</div>
                        <p className="text-xs text-zinc-500">Pending or Shipped</p>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Customers</CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCustomers || 0}</div>
                        <p className="text-xs text-zinc-500">Registered users</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
