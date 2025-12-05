import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AccountOverviewPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>
                        You are logged in as {user.email}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="/account/orders">View Orders</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/account/settings">Edit Profile</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
