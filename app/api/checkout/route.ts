import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover' as any, // Cast to any to avoid version mismatch errors if types are outdated
});

interface CartItem {
    id: string;
    quantity: number;
}

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json() as { cartItems: CartItem[] };
        const { cartItems } = body;

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Fetch products from Supabase to verify prices
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .in('id', cartItems.map((item) => item.id));

        if (productsError || !products) {
            return NextResponse.json({ error: 'Products not found' }, { status: 400 });
        }

        const line_items = cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            if (!product) {
                throw new Error(`Product with id ${item.id} not found`);
            }

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: product.images,
                    },
                    unit_amount: product.price, // Assuming price is in cents
                },
                quantity: item.quantity,
            };
        });

        // Calculate total amount for the order record
        const totalAmount = line_items.reduce(
            (acc, item) => acc + item.price_data.unit_amount * item.quantity,
            0
        );

        // Create pending order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user.id,
                amount: totalAmount,
                status: 'pending',
            })
            .select()
            .single();

        if (orderError) {
            console.error('Error creating order:', orderError);
            return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
        }

        // Create Stripe Session
        const origin = req.headers.get('origin');
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/return?success=true&orderId=${order.id}`,
            cancel_url: `${origin}/return?canceled=true`,
            metadata: {
                orderId: order.id,
                userId: user.id,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: unknown) {
        console.error('Checkout error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
