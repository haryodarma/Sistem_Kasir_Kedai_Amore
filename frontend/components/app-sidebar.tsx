import {
  Coffee,
  CookingPot,
  Apple,
  Settings,
  Logs,
  ReceiptText,
  User,
  Home,
} from "lucide-react";

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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useCategoryStore } from "@/app/admin/categories/stores";
import { useTranscationStore } from "@/app/admin/transactions/stores";
import { useProductStore } from "@/app/admin/products/stores";
import { useRawStore } from "@/app/admin/raws/stores";
import { useLogStore } from "@/app/admin/logs/stores";

// Menu items.
const items = [
  {
    title: "Home",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        title: "Raw Materials",
        url: "/admin/raws",
        icon: CookingPot,
      },
      {
        title: "Products",
        url: "/admin/products",
        icon: Coffee,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Transactions",
        url: "/admin/transactions",
        icon: ReceiptText,
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        title: "Categories",
        url: "/admin/categories",
        icon: Apple,
      },
      {
        title: "Logs",
        url: "/admin/logs",
        icon: Logs,
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();

  const resetCategory = useCategoryStore((state) => state.resetData);
  const resetTransaction = useTranscationStore((state) => state.resetData);
  const resetProduct = useProductStore((state) => state.resetData);
  const resetRaw = useRawStore((state) => state.resetData);
  const resetLog = useLogStore((state) => state.resetData);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>Admin Dashboard</SidebarHeader>

        {items.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={
                      path == item.url
                        ? "bg-gray-600 text-white rounded-lg"
                        : ""
                    }
                  >
                    <SidebarMenuButton asChild className="hover:bg-gray-300 ">
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="h-full"></div>
        <SidebarFooter>
          <Button
            className="bg-red-600"
            onClick={() => {
              localStorage.removeItem("api-token");
              resetCategory();
              resetTransaction();
              resetRaw();
              resetLog();
              resetProduct();

              router.push("/");
            }}
          >
            Logout
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
