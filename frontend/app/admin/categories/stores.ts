import { httpRequest } from "@/services/httpRequest";
import { toast } from "sonner";
import { create } from "zustand";

export interface CategoryData {
  category_id: number;
  category_name: string;
}

interface CategoryStore {
  data: [];
  current_page: number;
  last_page: number;
  is_loading: boolean;
  fetchCategories: (page: number) => Promise<void>;
  addCategory: (payload: CategoryData) => Promise<void>;
  updateCategory: (payload: CategoryData) => Promise<void>;
  deleteCategory: (category_id: number) => Promise<void>;
  resetData: () => void;
}

const path = "/categories";

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  data: [],
  current_page: 1,
  last_page: 1,
  is_loading: false,
  fetchCategories: async (page = 1) => {
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
  addCategory: async (payload: CategoryData) => {
    try {
      let res = await httpRequest.post(`${path}`, payload);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchCategories } = get();
      await fetchCategories(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },

  updateCategory: async (payload: CategoryData) => {
    try {
      let res = await httpRequest.put(
        `${path}/${payload.category_id}`,
        payload
      );

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchCategories } = get();
      await fetchCategories(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  deleteCategory: async (category_id: number) => {
    try {
      const res = await httpRequest.delete(`${path}/${category_id}`);

      const { fetchCategories } = get();
      await fetchCategories(1);
    } catch (e) {}
  },
  resetData: () => {
    set({ data: [] });
  },
}));
