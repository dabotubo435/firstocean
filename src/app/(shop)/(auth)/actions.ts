"use server";

import { FormAction } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const register: FormAction = async (_, formData) => {
  const supabase = createSupabaseServerClient(await cookies());

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    passwordConfirm: formData.get("passwordConfirm") as string,
  };
  if (data.password !== data.passwordConfirm) {
    return { success: false, error: "Passwords do not match" };
  }
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    return { success: false, error: error.message };
  }
  redirect("/account");
};

export const login: FormAction = async (_, formData) => {
  const supabase = createSupabaseServerClient(await cookies());

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { success: false, error: error.message };
  }
  redirect("/account");
};

export const logout = async () => {
  const supabase = createSupabaseServerClient(await cookies());
  const { error } = await supabase.auth.signOut();
  if (!error) {
    redirect("/");
  }
};
