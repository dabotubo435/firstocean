import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGridIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HeaderCart } from "./header-cart";
import { HeaderCategories } from "./header-categories";
import { HeaderUser } from "./header-user";

export function Header() {
  return (
    <div className="border-b border-gray-100 [&+main]:min-h-96">
      <div className="py-2 flex container justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={logo} alt="First Ocean Supermarket" className="w-28" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 items-center outline-none data-[state=open]:border-gray-400 border rounded-full py-2 px-2 sm:px-5">
              <LayoutGridIcon className="size-4" />{" "}
              <span className="hidden sm:inline text-xs">Category</span>
            </DropdownMenuTrigger>
            <Suspense fallback={null}>
              <HeaderCategories />
            </Suspense>
          </DropdownMenu>

          <div className="md:flex gap-2 focus-within:border-gray-400 items-center border rounded-full p-2 px-4 hidden">
            <Search className="size-4" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-transparent"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <HeaderCart />
          <Suspense
            fallback={
              <Button size="sm" className="bg-primary rounded-md text-white">
                <Link href="/login">Login</Link>
              </Button>
            }
          >
            <HeaderUser />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
