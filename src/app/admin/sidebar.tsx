"use client";

import logo from "@/assets/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSupabase } from "@/supabase/hooks";
import { User } from "@supabase/supabase-js";
import {
  CheckCircleIcon,
  ChevronUp,
  ClockIcon,
  InboxIcon,
  LayoutGridIcon,
  Package2Icon,
  PlusIcon,
  SearchIcon,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "../(shop)/(auth)/actions";

export function AdminSidebar({ user }: { user: User }) {
  const { query: isAdminQuery } = useSupabase((supabase) =>
    supabase.rpc("is_admin")
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/admin" className="flex justify-center">
          <Image
            priority
            src={logo}
            alt="First Ocean Supermarket"
            className="w-28"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin">
                    <InboxIcon className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Orders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/orders/pull">
                    <SearchIcon className="size-4" />
                    <span>Pull Order</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/orders">
                    <ClockIcon className="size-4" />
                    <span>Pending Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/orders/completed">
                    <CheckCircleIcon className="size-4" />
                    <span>Completed Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Products</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/products">
                    <Package2Icon className="size-4" />
                    <span>All Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/products/pull">
                    <SearchIcon className="size-4" />
                    <span>Pull Product</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/products/create">
                    <PlusIcon className="size-4" />
                    <span>Create Product</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <div className="h-px bg-gray-200"></div>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/categories">
                    <LayoutGridIcon className="size-4" />
                    <span>All Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/categories/create">
                    <PlusIcon className="size-4" />
                    <span>Create Category</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {isAdminQuery && (
                  <DropdownMenuLabel className="text-[9px] text-muted-foreground py-0 uppercase">
                    {isAdminQuery.data ? "Admin" : "Staff"}
                  </DropdownMenuLabel>
                )}
                <DropdownMenuLabel className="truncate">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={logout}>
                  <span className="text-red-500">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
