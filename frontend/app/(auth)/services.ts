import { toast } from "sonner";
import { httpRequest } from "@/services/httpRequest";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const res = await httpRequest.post(`/login`, { username, password });

    if (res.status > 299 || res.status < 200) {
      return { status: false };
    }

    const data = await res.data;

    localStorage.setItem("api-token", data.data.token);

    return { status: true };
  } catch (e) {}
}

export async function refreshToken() {
  try {
    const res = await httpRequest.get(`/refresh-token`);

    if (res.status > 299 || res.status < 200) {
      window.location.href = "/login";
      return { status: false };
    }

    const data = await res.data;

    localStorage.setItem("api-token", data.data.token);
  } catch (e) {}
}
