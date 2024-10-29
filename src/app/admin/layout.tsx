import logo from "@/assets/images/logo.png";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  createSupabaseServerAdminClient,
  createSupabaseServerClient,
} from "@/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { AdminSidebar } from "./sidebar";

export default async function AdminLayout(props: { children: ReactNode }) {
  const supabase = createSupabaseServerClient(cookies());
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/");

  const supabaseAdmin = createSupabaseServerAdminClient();
  const { data: staff } = await supabaseAdmin
    .from("staffs")
    .select()
    .eq("user_id", data.user.id)
    .limit(1)
    .single();
  if (!staff?.is_admin) redirect("/");

  return (
    <SidebarProvider>
      <AdminSidebar user={data.user} />
      <div className="p-4 flex-1">
        <div className="flex justify-between items-center mb-4 gap-4">
          <SidebarTrigger className="size-5" />
          <div className="flex justify-center items-center gap-4">
            <p className="truncate">{data.user?.email}</p>
            <Image
              priority
              src={logo}
              alt="First Ocean Supermarket"
              className="md:hidden w-16"
            />
          </div>
        </div>
        {props.children}
      </div>
    </SidebarProvider>
  );
}
