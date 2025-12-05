import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    size: string
    quantity: number
}

interface CartStore {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: string, size: string) => void
    clearCart: () => void
    // We will store these as derived state to ensure reactivity and persistence
    count: number
    total: number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            count: 0,
            total: 0,
            addItem: (data) => {
                console.log("Adding item to cart:", data);
                const currentItems = get().items
                const existingItem = currentItems.find(
                    (item) => item.id === data.id && item.size === data.size
                )

                let newItems: CartItem[]

                if (existingItem) {
                    newItems = currentItems.map((item) =>
                        item.id === data.id && item.size === data.size
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                } else {
                    newItems = [...currentItems, { ...data, quantity: 1 }]
                }

                // Recalculate totals
                const count = newItems.reduce((acc, item) => acc + item.quantity, 0)
                const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

                console.log("Cart updated:", { newItems, count, total });
                set({ items: newItems, count, total })
            },
            removeItem: (id, size) => {
                const currentItems = get().items
                const newItems = currentItems.filter(
                    (item) => !(item.id === id && item.size === size)
                )

                // Recalculate totals
                const count = newItems.reduce((acc, item) => acc + item.quantity, 0)
                const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

                set({ items: newItems, count, total })
            },
            clearCart: () => set({ items: [], count: 0, total: 0 }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
