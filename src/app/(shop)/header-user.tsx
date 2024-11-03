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
import { cookies } from "next/headers";
import Link from "next/link";
import { logout } from "./(auth)/actions";

export async function HeaderUser() {
  const supabase = createSupabaseServerClient(await cookies());
  const [
    {
      data: { user },
    },
    { data: is_staff },
  ] = await Promise.all([supabase.auth.getUser(), supabase.rpc("is_staff")]);

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
          {is_staff && (
            <Link href="/admin">
              <MenubarItem>Go to admin</MenubarItem>
            </Link>
          )}
          <MenubarSeparator />
          <form action={logout}>
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
