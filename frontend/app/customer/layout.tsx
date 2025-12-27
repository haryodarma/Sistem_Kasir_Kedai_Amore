"use client";

import { useEffect } from "react";
import DetailOrder from "./detail";
import { useRouter } from "next/navigation";
import { httpRequest } from "@/services/httpRequest";
import { jwtDecode } from "jwt-decode";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    httpRequest.get("/auth/check").catch(() => {
      router.push("/");
    });
    const user: any = jwtDecode(localStorage.getItem("api-token") ?? "");
    console.log(user.role);
  }, []);
  return (
    <div className="min-h-screen  min-w-screen flex justify-around items-start p-10 rounded-xl  ">
      <div className="w-7/10 border h-full">{children}</div>
      <DetailOrder />
    </div>
  );
}
