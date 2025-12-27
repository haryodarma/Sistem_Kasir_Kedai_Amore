import { httpRequest } from "@/services/httpRequest";
import { toast } from "sonner";
import { create } from "zustand";

export interface RecipeData {
  recipe_id: number | undefined;
  recipe_qty: number;
  product_id: number;
  raw_id: number;
}

interface RecipeStore {
  data: [];
  current_page: number;
  last_page: number;
  is_loading: boolean;
  fetchRecipes: (page: number) => Promise<void>;
  fetchRecipesByProduct: (product_id: number) => Promise<void>;
  addRecipe: (payload: {
    recipe_qty: number;
    product_id: number;
    raw_id: number;
  }) => Promise<void>;
  updateRecipe: (payload: RecipeData) => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
}

const path = "/recipes";

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  data: [],
  current_page: 1,
  last_page: 1,
  is_loading: false,
  fetchRecipes: async (page = 1) => {
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
  fetchRecipesByProduct: async (product_id: number) => {
    try {
      set({ is_loading: true });
      let res = await httpRequest.get(`${path}/product/${product_id}`);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      set({ ...res.data.data });
      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  addRecipe: async (payload: {
    recipe_qty: number;
    product_id: number;
    raw_id: number;
  }) => {
    try {
      const res = await httpRequest.post(`${path}`, payload);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      // const { fetchRecipes } = get();
      // await fetchRecipes(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },

  updateRecipe: async (payload: RecipeData) => {
    try {
      let res = await httpRequest.put(`${path}/${payload.recipe_id}`, payload);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      // const { fetchRecipes } = get();
      // await fetchRecipes(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  deleteRecipe: async (id: number) => {
    try {
      const res = await httpRequest.delete(`${path}/${id}`);

      // const { fetchRecipes } = get();
      // await fetchRecipes(1);
    } catch (e) {}
  },
}));
