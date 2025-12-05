"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/update-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { toast } from "sonner";

const initialState = {
    message: "",
    success: false,
    errors: {},
};

export function ProfileForm({ profile }: { profile: any }) {
    const [state, formAction, isPending] = useActionState(updateProfile, initialState);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                        Update your personal information and shipping details.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                            id="full_name"
                            name="full_name"
                            defaultValue={profile?.full_name || ""}
                            placeholder="John Doe"
                        />
                        {state.errors?.full_name && (
                            <p className="text-sm text-destructive">{state.errors.full_name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="shipping_address">Shipping Address</Label>
                        <Input
                            id="shipping_address"
                            name="shipping_address"
                            defaultValue={profile?.shipping_address || ""}
                            placeholder="123 Street Name"
                        />
                        {state.errors?.shipping_address && (
                            <p className="text-sm text-destructive">{state.errors.shipping_address}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                name="city"
                                defaultValue={profile?.city || ""}
                                placeholder="Mumbai"
                            />
                            {state.errors?.city && (
                                <p className="text-sm text-destructive">{state.errors.city}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                defaultValue={profile?.phone || ""}
                                placeholder="+91 98765 43210"
                            />
                            {state.errors?.phone && (
                                <p className="text-sm text-destructive">{state.errors.phone}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
