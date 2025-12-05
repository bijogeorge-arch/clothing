"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "T-Shirts", "Jackets", "Pants", "Hoodies", "Footwear"];
const MAX_PRICE = 100000;

export function FilterSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State for filters
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
    const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Initialize price from URL
    useEffect(() => {
        const min = Number(searchParams.get("minPrice")) || 0;
        const max = Number(searchParams.get("maxPrice")) || MAX_PRICE;
        setPriceRange([min, max]);
    }, [searchParams]);

    // Update URL helper
    const updateFilters = useCallback((category: string, price: number[]) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category && category !== "All") {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        if (price[0] > 0) params.set("minPrice", price[0].toString());
        else params.delete("minPrice");

        if (price[1] < MAX_PRICE) params.set("maxPrice", price[1].toString());
        else params.delete("maxPrice");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    // Handle Category Click
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        updateFilters(category, priceRange);
    };

    // Handle Price Change (Debounced)
    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    };

    const handlePriceCommit = (value: number[]) => {
        updateFilters(selectedCategory, value);
    };

    const FilterContent = () => (
        <div className="flex flex-col gap-8">
            {/* Categories */}
            <div className="space-y-4">
                <h3 className="text-lg font-display uppercase tracking-wider text-white">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                selectedCategory === cat
                                    ? "bg-neon-lime text-black border-neon-lime shadow-[0_0_10px_rgba(204,255,0,0.4)]"
                                    : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-display uppercase tracking-wider text-white">Price Range</h3>
                    <span className="font-mono text-neon-lime text-sm">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                    </span>
                </div>
                <Slider
                    defaultValue={[0, MAX_PRICE]}
                    value={priceRange}
                    max={MAX_PRICE}
                    step={500}
                    onValueChange={handlePriceChange}
                    onValueCommit={handlePriceCommit}
                    className="py-4"
                />
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 sticky top-24 h-fit space-y-8 p-6 bg-neutral-900/50 backdrop-blur-md rounded-xl border border-white/5">
                <FilterContent />
            </div>

            {/* Mobile Trigger */}
            <div className="lg:hidden mb-6">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex justify-between items-center border-neutral-800 bg-neutral-900/80 text-white hover:bg-neutral-800 hover:text-neon-lime transition-colors">
                            <span className="flex items-center gap-2">
                                <Filter size={16} />
                                Filters
                            </span>
                            {(selectedCategory !== "All" || priceRange[0] > 0 || priceRange[1] < MAX_PRICE) && (
                                <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-neutral-950 border-r border-white/10 w-[85vw] sm:w-[400px]">
                        <SheetHeader className="mb-8 text-left">
                            <SheetTitle className="text-2xl font-display uppercase tracking-wider text-white">
                                Filters
                            </SheetTitle>
                        </SheetHeader>
                        <FilterContent />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
