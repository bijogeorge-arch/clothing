"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { updateOrderStatus } from "@/app/admin/actions"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface OrderSheetProps {
    order: any
    trigger: React.ReactNode
}

export function OrderSheet({ order, trigger }: OrderSheetProps) {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(order.status)
    const [isPending, startTransition] = useTransition()

    const handleStatusChange = (value: string) => {
        setStatus(value)
        startTransition(async () => {
            await updateOrderStatus(order.id, value)
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="text-white">Order Details</SheetTitle>
                    <SheetDescription className="text-zinc-400">
                        Order ID: {order.id}
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-zinc-400">Status</h3>
                        <Select
                            value={status}
                            onValueChange={handleStatusChange}
                            disabled={isPending}
                        >
                            <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-white">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-zinc-400">Customer</h3>
                        <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800">
                            <p className="text-sm text-white">{order.profiles?.email || 'Unknown'}</p>
                            <p className="text-xs text-zinc-500">User ID: {order.user_id}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-zinc-400">Order Summary</h3>
                        <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Total Amount</span>
                                <span className="text-white font-bold">${(order.amount / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Date</span>
                                <span className="text-white">{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {order.items && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-zinc-400">Items</h3>
                            <div className="space-y-2">
                                <pre className="text-xs text-zinc-500 overflow-auto max-h-40 bg-black p-2 rounded border border-zinc-800">
                                    {JSON.stringify(order.items, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}

                </div>
            </SheetContent>
        </Sheet>
    )
}
