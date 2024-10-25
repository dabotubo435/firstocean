"use client";

import logo from "@/assets/images/logo.png";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { createSupabaseClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  CheckCircleIcon,
  ChevronUp,
  ChevronUpIcon,
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

type Item = { title: string; url: string; icon: JSX.Element; items?: Item[] };
type ItemGroup = { group: string; items: Item[] };

const items: ItemGroup[] = [
  {
    group: "Home",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: <InboxIcon className="size-4" />,
      },
    ],
  },
  {
    group: "Products",
    items: [
      {
        title: "Products",
        url: "/admin/products",
        icon: <Package2Icon className="size-4" />,
        items: [
          {
            title: "Pull Product",
            url: "/admin/products/pull",
            icon: <SearchIcon className="size-4" />,
          },
          {
            title: "Create Product",
            url: "/admin/products/create",
            icon: <PlusIcon className="size-4" />,
          },
        ],
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: <LayoutGridIcon className="size-4" />,
        items: [
          {
            title: "Create Category",
            url: "/admin/categories/create",
            icon: <PlusIcon className="size-4" />,
          },
        ],
      },
    ],
  },
  {
    group: "Orders",
    items: [
      {
        title: "Pull Order",
        url: "/admin/orders/pull",
        icon: <SearchIcon className="size-4" />,
      },
      {
        title: "Pending Orders",
        url: "/admin/orders",
        icon: <ClockIcon className="size-4" />,
      },
      {
        title: "Completed Orders",
        url: "/admin/orders/archive",
        icon: <CheckCircleIcon className="size-4" />,
      },
    ],
  },
];

export function AdminSidebar({ user }: { user: User }) {
  const supabase = createSupabaseClient();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-center">
          <Image src={logo} alt="First Ocean Supermarket" className="w-28" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup key={item.group}>
            <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <Collapsible
                    key={item.title}
                    defaultOpen
                    disabled={!item.items}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuAction>
                        {item.items && (
                          <CollapsibleTrigger asChild>
                            <ChevronUpIcon className="size-4 group-data-[state=open]/collapsible:rotate-180 transition-transform" />
                          </CollapsibleTrigger>
                        )}
                      </SidebarMenuAction>

                      {item.items && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={item.url}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
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
