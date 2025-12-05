import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/ProfileForm";

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <ProfileForm profile={profile} />
        </div>
    );
}
