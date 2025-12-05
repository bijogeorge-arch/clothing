"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OrderSheet } from "./order-sheet"

export type Order = {
    id: string
    amount: number
    status: string
    created_at: string
    user_id: string
    profiles?: {
        email: string
    }
    items?: any
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order ID",
        cell: ({ row }) => <div className="font-mono text-xs text-zinc-400">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "profiles.email",
        header: "Customer",
        cell: ({ row }) => {
            const email = row.original.profiles?.email
            return <div className="text-sm text-white">{email || "Unknown"}</div>
        },
    },
    {
        accessorKey: "amount",
        header: "Total",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount / 100)

            return <div className="font-medium text-white">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant="outline" className={
                    status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        status === 'shipped' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                }>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return <div className="text-xs text-zinc-500">{new Date(row.getValue("created_at")).toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original

            return (
                <OrderSheet order={order} trigger={
                    <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900">
                        View Details
                    </Button>
                } />
            )
        },
    },
]
