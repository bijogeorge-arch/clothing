"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    shipping_address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { message: "Unauthorized", success: false };
    }

    const rawData = {
        full_name: formData.get("full_name"),
        shipping_address: formData.get("shipping_address"),
        city: formData.get("city"),
        phone: formData.get("phone"),
    };

    const validatedFields = profileSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to update profile.",
            success: false,
        };
    }

    const { error } = await supabase
        .from("profiles")
        .update(validatedFields.data)
        .eq("id", user.id);

    if (error) {
        console.error("Profile update error:", error);
        return { message: "Database Error: Failed to update profile.", success: false };
    }

    revalidatePath("/account/settings");
    return { message: "Profile updated successfully!", success: true };
}
