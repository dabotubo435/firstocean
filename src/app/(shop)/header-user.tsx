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
import { createSupabaseServerClient } from "@/supabase/server";
import { UserIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

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
          <MenubarSeparator />
          <form id="logout" action={logout}>
            <button className="w-full text-left rounded-sm text-red-500 px-2 py-1.5 focus:text-red-500 hover:bg-red-50">
              Logout
            </button>
          </form>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ) : (
    <Link href="/login">
      <Button size="sm" className="bg-primary rounded-md text-white">
        Login
      </Button>
    </Link>
  );
}
