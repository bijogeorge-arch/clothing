import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default async function OrdersPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: orders, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        return <div>Error loading orders.</div>;
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground">Go buy some cool stuff!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Orders</h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/40 flex flex-row items-center justify-between py-4">
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                    Order #{order.id.slice(0, 8)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {format(new Date(order.created_at), "MMM dd, yyyy")}
                                </span>
                            </div>
                            <Badge variant={order.status === 'Shipped' ? 'default' : 'secondary'}>
                                {order.status}
                            </Badge>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {order.order_items.map((item: any) => (
                                    <div key={item.id} className="flex-shrink-0 w-24 space-y-2">
                                        <div className="relative aspect-square rounded-md overflow-hidden border bg-muted">
                                            {item.product?.images?.[0] && (
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <p className="text-xs font-medium truncate">
                                            {item.product?.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/40 py-4 flex justify-between items-center">
                            <span className="text-sm font-medium">Total Amount</span>
                            <span className="text-lg font-bold">
                                ₹{order.amount.toLocaleString()}
                            </span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
