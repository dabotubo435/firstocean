import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  createSupabaseServerAdminClient,
  createSupabaseServerClient,
} from "@/supabase/server";
import { User } from "@supabase/supabase-js";
import { UserIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export async function HeaderUser() {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const logout = async () => {
    "use server";
    const supabase = createSupabaseServerClient(cookies());
    const { error } = await supabase.auth.signOut();
    if (!error) {
      revalidatePath("/", "layout");
      redirect("/");
    }
  };

  return user ? (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="flex gap-2 items-center outline-none data-[state=open]:border-gray-400 border rounded-full py-2 px-2">
          <UserIcon className="size-4" />{" "}
          <span className="hidden sm:inline max-w-40 text-xs truncate">
            {user.email}
          </span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>{user.email}</MenubarLabel>
          <MenubarSeparator />
          <Link href="/account">
            <MenubarItem>View account</MenubarItem>
          </Link>
          <Link href="/checkout">
            <MenubarItem>View cart</MenubarItem>
          </Link>
          <Suspense fallback={null}>
            <AdminOnly user={user}>
              <Link href="/admin">
                <MenubarItem>Go to admin</MenubarItem>
              </Link>
            </AdminOnly>
          </Suspense>
          <MenubarSeparator />
          <form id="logout" action={logout}>
            <button className="w-full text-left rounded-sm text-destructive px-2 py-1.5 focus:text-destructive hover:bg-red-50">
              Logout
            </button>
          </form>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ) : (
    <Button size="sm" className="bg-primary rounded-md text-white">
      <Link href="/login">Login</Link>
    </Button>
  );
}

async function AdminOnly({
  user,
  children,
}: {
  user: User | undefined;
  children: ReactNode;
}) {
  if (!user) return null;
  const supabaseAdmin = createSupabaseServerAdminClient();
  const { data: staff } = await supabaseAdmin
    .from("staffs")
    .select()
    .eq("user_id", user.id)
    .limit(1)
    .single();
  if (!staff) return null;
  return <>{children}</>;
}
