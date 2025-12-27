"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { url } from "@/services/httpRequest";
import { DollarSign, Minus, Plus, Trash2 } from "lucide-react";
import { ProductData } from "../admin/products/stores";
import useCustomerStore, { ItemData } from "./store";
import { useShallow } from "zustand/react/shallow";
import { useTranscationStore } from "../admin/transactions/stores";
import { useRouter } from "next/navigation";
import { clear } from "console";

export default function DetailOrder() {
  const { orders } = useCustomerStore(
    useShallow((state) => ({
      orders: state.orders,
    }))
  );

  return (
    <>
      <OrderSummary />
    </>
  );
}

function ItemCard({ item, qty }: { item: ProductData; qty: number }) {
  const { addUpdate, addDelete } = useCustomerStore();

  const handleIncrease = () => {
    addUpdate(item.product_id, qty + 1);
  };

  const handleDecrease = () => {
    if (qty <= 1) {
      addDelete(item.product_id);
    } else {
      addUpdate(item.product_id, qty - 1);
    }
  };

  const handleDelete = () => {
    addDelete(item.product_id);
  };

  return (
    <div className="border p-2 rounded-md bg-white shadow-sm flex justify-between text-slate-900">
      {/* LEFT */}
      <div className="flex gap-3">
        <img
          src={`${url}${item.product_image}`}
          alt={item.product_name}
          className="h-20 aspect-square rounded-lg object-cover shadow"
        />

        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold leading-tight">
            {item.product_name}
          </h1>

          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
              {item.category.category_name}
            </span>

            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-medium uppercase">
              {item.product_size}
            </span>

            <span
              className={`text-xs font-semibold ${
                item.is_hot ? "text-red-600" : "text-blue-600"
              }`}
            >
              {item.is_hot ? "HOT" : "ICE"}
            </span>
          </div>

          <span className="font-semibold text-slate-900">
            Rp {item.product_price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <ConfirmDeleteDialog onConfirm={handleDelete} />

        {/* QTY CONTROL */}
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecrease}
          className="border-slate-900 hover:scale-105 transition"
        >
          <Minus />
        </Button>

        <span className="text-lg font-semibold w-6 text-center">{qty}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncrease}
          className="border-slate-900 hover:scale-105 transition"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

function OrderSummary() {
  const addTransaction = useTranscationStore((state) => state.addTransaction);
  const clearOrders = useCustomerStore((state) => state.clearOrders);
  const orders = useCustomerStore((state) => state.orders);
  const totalPrice = orders.reduce(
    (total, order) => total + order.qty * order.item.product_price,
    0
  );

  const router = useRouter();

  const handleCheckout = () => {
    addTransaction({
      transaction_discount: 0,
      items: orders,
      transaction_total: totalPrice,
      transaction_status: "pending",
    }).then(() => {
      clearOrders();
      router.push("/");
    });
  };

  return (
    <div className="w-[30%] bg-orange-50 p-5 rounded-tr-xl rounded-br-xl shadow-lg flex flex-col gap-5">
      <h1 className="text-2xl text-center font-bold bg-orange-950 text-white p-4 rounded-lg">
        Current Order
      </h1>

      <div className="flex flex-col max-h-[60vh] overflow-y-auto pr-1">
        {orders.length === 0 ? (
          <p className="text-center text-slate-500">No items added yet</p>
        ) : (
          orders.map((value, index) => (
            <ItemCard key={index} item={value.item} qty={value.qty} />
          ))
        )}
      </div>

      <hr className="bg-slate-300 h-0.5 rounded-full" />

      <div className="flex justify-between items-center text-slate-900 text-xl font-semibold">
        <span>Total Amount</span>
        <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
      </div>

      {/* CHECKOUT CONFIRMATION */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={orders.length === 0}
            className="bg-green-900 text-xl h-14 font-bold flex items-center justify-center gap-2
                       hover:scale-105 hover:bg-transparent hover:text-green-900
                       hover:border-2 hover:border-green-900 transition"
          >
            <DollarSign className="size-6" />
            Proceed to Checkout
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm checkout?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to proceed with this order. Please make sure all
              items and quantities are correct before continuing.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCheckout}
              className="bg-green-900 hover:bg-green-950"
            >
              Confirm Checkout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface ConfirmDeleteDialogProps {
  onConfirm: () => void;
}

export function ConfirmDeleteDialog({ onConfirm }: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove item?</AlertDialogTitle>
          <AlertDialogDescription>
            This item will be removed from the current order. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
