import { httpRequest } from "@/services/httpRequest";
import { toast } from "sonner";
import { create } from "zustand";

export interface RawData {
  raw_id: number;
  raw_name: string;
  raw_stock: number;
  raw_unit: string;
}

interface RawStores {
  data: [];
  current_page: number;
  last_page: number;
  is_loading: boolean;
  fetchRaws: (page: number) => Promise<void>;
  addRaw: (payload: RawData) => Promise<void>;
  updateRaw: (payload: RawData) => Promise<void>;
  deleteRaw: (raw_id: number) => Promise<void>;
  resetData: () => void;
}

export const useRawStore = create<RawStores>((set, get) => ({
  data: [],
  current_page: 1,
  last_page: 1,
  is_loading: false,
  fetchRaws: async (page = 1) => {
    try {
      set({ is_loading: true });
      let res = await httpRequest.get(`/raws?page=${page}`);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      set({ ...res.data.data });
      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  addRaw: async (payload: RawData) => {
    try {
      let res = await httpRequest.post(`/raws`, payload);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchRaws } = get();
      await fetchRaws(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },

  updateRaw: async (payload: RawData) => {
    try {
      let res = await httpRequest.put(`/raws/${payload.raw_id}`, payload);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchRaws } = get();
      await fetchRaws(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  deleteRaw: async (raw_id: number) => {
    try {
      const res = await httpRequest.delete(`/raws/${raw_id}`);

      const { fetchRaws } = get();
      await fetchRaws(1);
    } catch (e) {}
  },
  resetData: () => {
    set({ data: [] });
  },
}));
