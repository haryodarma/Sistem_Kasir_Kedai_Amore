import { httpRequest, url } from "@/services/httpRequest";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export interface ProductData {
  product_id: number;
  product_name: string;
  product_image: File;
  product_price: number;
  product_size: string;
  is_hot: number | boolean;
  is_active: number;
  category: { category_name: string };
  category_id: number;
  created_at: string;
  recipes: [];
}

interface ProductStore {
  data: [];
  current_page: number;
  last_page: number;
  is_loading: boolean;
  fetchProducts: (page: number) => Promise<void>;
  addProduct: (payload: ProductData) => Promise<void>;
  updateProduct: (payload: ProductData) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  resetData: () => void;
}

const path = "/products";

export const useProductStore = create<ProductStore>((set, get) => ({
  data: [],
  current_page: 1,
  last_page: 1,
  is_loading: false,
  fetchProducts: async (page = 1) => {
    try {
      set({ is_loading: true });
      let res = await httpRequest.get(`${path}?page=${page}`);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      set({ ...res.data.data });
      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  addProduct: async (payload: ProductData) => {
    console.log(payload);
    try {
      const formData = new FormData();
      formData.append("product_image", payload.product_image);
      formData.append("product_name", payload.product_name);
      formData.append("product_price", String(payload.product_price));
      formData.append("product_size", payload.product_size);
      formData.append("category_id", String(payload.category_id));
      formData.append("is_hot", String(payload.is_hot));
      formData.append("is_active", String(payload.is_active));
      const res = await axios.post(`${url}/api${path}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("api-token")}`,
        },
      });

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchProducts } = get();
      await fetchProducts(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },

  updateProduct: async (payload: ProductData) => {
    console.log(payload);
    try {
      const formData = new FormData();
      if (payload.product_image instanceof File) {
        formData.append("product_image", payload.product_image);
      }
      formData.append("product_name", payload.product_name);
      formData.append("product_price", String(payload.product_price));
      formData.append("product_size", payload.product_size);
      formData.append("category_id", String(payload.category_id));
      formData.append("is_hot", String(payload.is_hot) ?? "1");
      formData.append("is_active", String(payload.is_active) ?? "1");

      const res = await axios.put(
        `${url}/api${path}/${payload.product_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("api-token")}`,
          },
        }
      );

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchProducts } = get();
      await fetchProducts(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  deleteProduct: async (id: number) => {
    try {
      const res = await httpRequest.delete(`${path}/${id}`);

      const { fetchProducts } = get();
      await fetchProducts(1);
    } catch (e) {}
  },
  resetData: () => {
    set({ data: [] });
  },
}));
