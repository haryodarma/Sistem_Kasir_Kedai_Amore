"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from "react";
import { httpRequest } from "@/services/httpRequest";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useCategoryStore } from "@/app/admin/categories/stores";
import { useTranscationStore } from "@/app/admin/transactions/stores";
import { useProductStore } from "@/app/admin/products/stores";
import { useRawStore } from "@/app/admin/raws/stores";
import { useLogStore } from "@/app/admin/logs/stores";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const resetCategory = useCategoryStore((state) => state.resetData);
  const resetTransaction = useTranscationStore((state) => state.resetData);
  const resetProduct = useProductStore((state) => state.resetData);
  const resetRaw = useRawStore((state) => state.resetData);
  const resetLog = useLogStore((state) => state.resetData);
  useEffect(() => {
    httpRequest
      .get("/auth/check")
      .then(() => {
        const user: any = jwtDecode(localStorage.getItem("api-token") ?? "");
        console.log(user.role);
        if (user.role != "owner") {
          resetCategory();
          resetTransaction();
          resetRaw();
          resetLog();
          resetProduct();

          router.push("/");
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 ">
        <SidebarTrigger />
        <div className="lg:p-10 p-5">{children}</div>
      </main>
    </SidebarProvider>
  );
}
