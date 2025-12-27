import { httpRequest } from "@/services/httpRequest";
import { toast } from "sonner";
import { create } from "zustand";

export interface LogData {
  log_id: number;
  log_method: string;
  log_ip: string;
  log_useragent: string;
  log_url: string;
  created_at: string;
}

interface LogStore {
  data: [];
  current_page: number;
  last_page: number;
  is_loading: boolean;
  fetchLogs: (page: number) => Promise<void>;
  resetData: () => void;
}

const path = "/logs";

export const useLogStore = create<LogStore>((set, get) => ({
  data: [],
  current_page: 1,
  last_page: 1,
  is_loading: false,
  fetchLogs: async (page = 1) => {
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
  resetData: () => {
    set({ data: [] });
  },
}));
