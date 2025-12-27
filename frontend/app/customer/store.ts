import { create } from "zustand";
import { ProductData } from "../admin/products/stores";

export interface ItemData {
  item: ProductData;
  qty: number;
}

interface CustomerStore {
  orders: ItemData[];
  addOrder: (payload: ItemData) => void;
  addUpdate: (productId: number, qty: number) => void;
  addDelete: (productId: number) => void;

  clearOrders: () => void;
}

const useCustomerStore = create<CustomerStore>((set, get) => ({
  orders: [],

  // tambah item ke cart
  addOrder: (payload) => {
    const orders = get().orders;

    const existing = orders.find(
      (order) => order.item.product_id === payload.item.product_id
    );

    if (existing) {
      set({
        orders: orders.map((order) =>
          order.item.product_id === payload.item.product_id
            ? { ...order, qty: order.qty + payload.qty }
            : order
        ),
      });
    } else {
      set({
        orders: [...orders, payload],
      });
    }
  },

  // update qty
  addUpdate: (productId, qty) => {
    set({
      orders: get().orders.map((order) =>
        order.item.product_id === productId ? { ...order, qty } : order
      ),
    });
  },

  // hapus item
  addDelete: (productId) => {
    set({
      orders: get().orders.filter(
        (order) => order.item.product_id !== productId
      ),
    });
  },

  // reset cart
  clearOrders: () => {
    set({ orders: [] });
  },
}));

export default useCustomerStore;
