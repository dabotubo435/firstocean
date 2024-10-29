"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormAction, FormMessage, FormStatus } from "@/context/form";
import { Tables } from "@/supabase/types";
import { User } from "@supabase/supabase-js";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { updateProfile } from "./actions";

export function UpdateProfile({
  user,
  profile,
}: {
  user: User;
  profile: Tables<"profiles"> | null;
}) {
  const [editing, setEditing] = useState(false);

  const action: FormAction = async (formState, formData) => {
    const res = await updateProfile(formState, formData);
    if (res?.success) setEditing(false);
    return res;
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg mb-4 font-medium">Profile information</h2>
        <Button
          onClick={() => setEditing(!editing)}
          size="sm"
          variant="outline"
        >
          {editing ? "Cancel" : "Edit profile"}
        </Button>
      </div>

      {!editing ? (
        <div>
          <div className="divide-y">
            <div className="flex items-center justify-between py-4">
              <p>Email</p>
              <p>{profile?.email}</p>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>Name</p>
              <p>{profile?.name || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>Address</p>
              <p>{profile?.address || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>City</p>
              <p>{profile?.city || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>State/Province</p>
              <p>{profile?.state || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>Country</p>
              <p>{profile?.country || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>Nationality</p>
              <p>{profile?.nationality || "N/A"}</p>
            </div>
          </div>
        </div>
      ) : (
        <Form action={action}>
          <div className="divide-y">
            <div className="flex items-center justify-between py-4">
              <p>Email</p>
              <p>{user.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5">
              <label htmlFor="name">Name</label>
              <Input
                defaultValue={profile?.name}
                id="name"
                name="name"
                placeholder="Enter name"
                className="sm:max-w-80 h-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5">
              <label htmlFor="name">Address</label>
              <Input
                defaultValue={profile?.address ?? undefined}
                id="address"
                name="address"
                placeholder="Enter address"
                className="sm:max-w-80 h-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5">
              <label htmlFor="name">City</label>
              <Input
                defaultValue={profile?.city ?? undefined}
                id="city"
                name="city"
                placeholder="Enter city"
                className="sm:max-w-80 h-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5">
              <label htmlFor="name">State/Province</label>
              <Input
                defaultValue={profile?.state ?? undefined}
                id="state"
                name="state"
                placeholder="Enter state"
                className="sm:max-w-80 h-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5">
              <label htmlFor="name">Country</label>
              <Input
                defaultValue={profile?.country ?? undefined}
                id="country"
                name="country"
                placeholder="Enter country"
                className="sm:max-w-80 h-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5">
              <label htmlFor="name">Nationality</label>
              <Input
                defaultValue={profile?.nationality ?? undefined}
                id="nationality"
                name="nationality"
                placeholder="Enter nationality"
                className="sm:max-w-80 h-8"
              />
            </div>
          </div>

          <FormMessage type="error" className="text-red-500 text-center" />

          <FormStatus className="mt-4 flex items-center justify-end">
            <Button className="w-full sm:w-auto">
              <LoaderCircleIcon className="mr-2 animate-spin size-5 hidden group-data-[pending=true]:inline" />
              Update
            </Button>
          </FormStatus>
        </Form>
      )}
    </section>
  );
}
