import { createClient } from "@/utils/supabase/server"
import { DataTable } from "@/components/admin/orders/data-table"
import { columns } from "@/components/admin/orders/columns"

export default async function OrdersPage() {
    const supabase = await createClient()

    // Fetch last 50 orders to avoid loading too many at once
    // Client-side pagination in DataTable will handle these 50 items
    const { data: orders } = await supabase
        .from('orders')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false })
        .limit(50)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Orders</h2>
            </div>

            <DataTable columns={columns} data={orders || []} />
        </div>
    )
}
