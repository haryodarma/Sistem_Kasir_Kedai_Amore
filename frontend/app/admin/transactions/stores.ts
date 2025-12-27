import { ItemData } from "@/app/customer/store";
import { httpRequest } from "@/services/httpRequest";
import { toast } from "sonner";
import { create } from "zustand";

export interface TransactionData {
  transaction_id?: number;
  transaction_total: number;
  transaction_discount: number;
  transaction_status: string;
  items: ItemData[];
  created_at?: string;
}

interface TransactionStore {
  data: [];
  current_page: number;
  last_page: number;
  is_loading: boolean;
  fetchTransactions: (page: number) => Promise<void>;
  addTransaction: (payload: TransactionData) => Promise<void>;
  updateTransaction: (payload: {
    transaction_id: number | undefined;
    transaction_status: string;
  }) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  resetData: () => void;
}

const path = "/transactions";

export const useTranscationStore = create<TransactionStore>((set, get) => ({
  data: [],
  current_page: 1,
  last_page: 1,
  is_loading: false,
  fetchTransactions: async (page = 1) => {
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
  addTransaction: async (payload: TransactionData) => {
    try {
      let res = await httpRequest.post(`${path}`, payload);

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchTransactions } = get();
      await fetchTransactions(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },

  updateTransaction: async (payload: {
    transaction_id: number | undefined;
    transaction_status: string;
  }) => {
    try {
      let res = await httpRequest.put(`${path}/${payload.transaction_id}`, {
        transaction_status: payload.transaction_status,
      });

      if (res.status > 299 || res.status < 200) {
        toast.error("Failed to Send Request");
      }

      const { fetchTransactions } = get();
      await fetchTransactions(1);

      set({ is_loading: false });
    } catch (e) {
      toast.error("Internal Server Error");
    }
  },
  deleteTransaction: async (id: number) => {
    try {
      const res = await httpRequest.delete(`${path}/${id}`);

      const { fetchTransactions } = get();
      await fetchTransactions(1);
    } catch (e) {}
  },
  resetData: () => {
    set({ data: [] });
  },
}));
