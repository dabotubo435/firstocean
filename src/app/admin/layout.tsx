import logo from "@/assets/images/logo.png";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { AdminSidebar } from "./sidebar";

export default async function AdminLayout(props: { children: ReactNode }) {
  return (
    <Suspense>
      <ProtectedAdminLayout>{props.children}</ProtectedAdminLayout>
    </Suspense>
  );
}

export async function ProtectedAdminLayout(props: { children: ReactNode }) {
  const supabase = createSupabaseServerClient(await cookies());
  const [
    {
      data: { user },
    },
    { data: is_staff },
  ] = await Promise.all([supabase.auth.getUser(), supabase.rpc("is_staff")]);
  if (!user || !is_staff) redirect("/");

  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <div className="p-4 flex-1">
        <div className="flex justify-between items-center mb-4 gap-4">
          <SidebarTrigger className="size-5" />
          <div className="flex justify-center items-center gap-4">
            <p className="truncate">{user?.email}</p>
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
