"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye, SquareAsterisk, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useRouter } from "next/navigation";
import { login } from "./../services";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="p-10 gap-2 flex flex-col justify-center items-center lg:w-1/3 ">
        <Image
          src="/images/logoamor.png"
          alt="Logo Amore"
          width={175}
          height={175}
          className="rounded-full bg-transparent"
        />
        <h1 className="text-2xl font-bold mb-4">Welcome To Kedai Amor</h1>
        <ThemeToggle />
        <form className="lg:w-full ">
          <p className="mt-4">Username</p>
          <InputGroup>
            <InputGroupInput
              placeholder="Input Your Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputGroupAddon>
              <User />
            </InputGroupAddon>
          </InputGroup>
          <p className="mt-4">Password</p>
          <InputGroup>
            <InputGroupInput
              placeholder="Input Your Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroupAddon>
              <SquareAsterisk />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <Button
            type="submit"
            className="w-full mt-6 mb-6"
            onClick={(e) => {
              e.preventDefault();
              login({ username, password }).then((res) => route.push("/admin"));
            }}
          >
            Login
          </Button>
          <p className="text-center">
            Sudah punya akun?{" "}
            <Link className="text-blue-500" href="">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
