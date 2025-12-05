"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Settings, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const sidebarItems = [
    {
        title: "Overview",
        href: "/account",
        icon: LayoutDashboard,
    },
    {
        title: "My Orders",
        href: "/account/orders",
        icon: Package,
    },
    {
        title: "Settings",
        href: "/account/settings",
        icon: Settings,
    },
];

export function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <nav className="flex flex-col space-y-2">
            {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                            isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.title}
                    </Link>
                );
            })}

            <div className="pt-4 mt-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                >
                    <LogOut className="w-4 h-4" />
                    Log Out
                </Button>
            </div>
        </nav>
    );
}
