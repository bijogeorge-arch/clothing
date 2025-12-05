import { AccountSidebar } from "@/components/account/AccountSidebar";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container max-w-6xl py-10">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-24">
                        <div className="mb-6 px-4 md:px-0">
                            <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your orders and settings
                            </p>
                        </div>
                        <AccountSidebar />
                    </div>
                </aside>
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
