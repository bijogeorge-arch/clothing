'use client';

import { useState } from 'react';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';



export default function CheckoutButton() {
    const [loading, setLoading] = useState(false);
    const cartItems = useCart((state) => state.items);

    const onCheckout = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (data.url) {
                toast.info("Redirecting to checkout...")
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'An error occurred during checkout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={onCheckout}
            disabled={loading || cartItems.length === 0}
            className="w-full h-12 rounded-full bg-lime-400 text-black hover:bg-lime-500 font-bold tracking-wide uppercase"
        >
            {loading ? 'Processing...' : 'Checkout'}
        </Button>
    );
}
