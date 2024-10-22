import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGridIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderCart } from "./header-cart";
import { HeaderUser } from "./header-user";

const categories = ["Snacks", "Drinks", "home", "books", "toys"];

export function Header() {
  return (
    <div className="border-b border-gray-100">
      <div className="py-2 flex container justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="First Ocean Supermarket"
              width={60}
              height={60}
            />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 items-center outline-none data-[state=open]:border-gray-400 border rounded-full py-2 px-2 sm:px-5">
              <LayoutGridIcon className="size-4" />{" "}
              <span className="hidden sm:inline text-xs">Category</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-80 overflow-y-scroll">
              {categories.map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="flex text-xs gap-2 items-center p-2 cursor-pointer hover:bg-gray-200"
                >
                  <Link
                    href={
                      "/categories/" +
                      category.replaceAll(" ", "-").toLowerCase()
                    }
                    className="capitalize"
                  >
                    {category}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
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
        <div className="flex gap-5 items-center">
          <HeaderCart />
          <HeaderUser />
        </div>
      </div>
    </div>
  );
}
