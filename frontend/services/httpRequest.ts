import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = "http://127.0.0.1:8000/api";
export const url = "http://127.0.0.1:8000";

export const httpRequest = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpRequest.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("api-token");
  if (window.location.pathname.includes("login")) return config;
  if (token) {
    const now = Math.floor(Date.now() / 1000);
    const decoded = jwtDecode(token);
    if (decoded.exp! < now) {
      const res = await axios.get(`${apiUrl}/refresh-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("api-token", res.data.data.token);

      token = localStorage.getItem("api-token");
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
