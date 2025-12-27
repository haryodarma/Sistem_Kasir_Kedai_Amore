"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { login } from "./(auth)/services";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center min-h-screen flex-col gap-10 bg-[url('./wallpaper.jpg')]">
        <Image
          src={"/icon.png"}
          width={350}
          height={350}
          alt="Logo"
          className="animate-bounce"
        />
        <h1 className="text-7xl font-bold text-gray-900">
          Welcome to Kedai Amore
        </h1>
        <Button
          className="w-150 h-20 text-4xl bg-orange-950 text-white hover:bg-orange-900 "
          onClick={() => {
            login({ username: "customer", password: "password" }).then(() =>
              router.push("/customer")
            );
          }}
        >
          Mulai
        </Button>
        <p className="font-semibold text-slate-900">
          Login Sebagai Admin?{" "}
          <Link href={"/login"} className="text-orange-900">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
