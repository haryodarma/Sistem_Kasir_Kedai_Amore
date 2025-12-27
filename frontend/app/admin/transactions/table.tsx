"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Check, ReceiptText, Trash, X } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import Loading from "@/components/loading";
import { useEffect } from "react";
import { TransactionData, useTranscationStore } from "./stores";
import { formatDate, formatRupiah } from "@/util";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CategoryTable() {
  const {
    data,
    current_page,
    last_page,
    is_loading,
    fetchTransactions,
    updateTransactions,
  } = useTranscationStore(
    useShallow((state) => ({
      data: state.data,
      current_page: state.current_page,
      last_page: state.last_page,
      is_loading: state.is_loading,
      fetchTransactions: state.fetchTransactions,
      updateTransactions: state.updateTransaction,
    }))
  );

  const statusStyle = "rounded-lg py-1 px-3 w-fit";

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  return (
    <div className="flex flex-col ">
      {is_loading ? (
        <Loading />
      ) : (
        <Table className="mb-5 mt-5">
          <TableHeader className="font-bold">
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell>User</TableCell> */}
              <TableCell>Discount</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Update Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction: TransactionData, index) => (
              <TableRow key={index}>
                <TableCell className="w-25">{index + 1}</TableCell>
                <TableCell>
                  {formatDate(transaction.created_at ?? "")}
                </TableCell>
                {/* <TableCell>{transaction.user.username}</TableCell> */}
                <TableCell>{transaction.transaction_discount}%</TableCell>
                <TableCell>
                  {formatRupiah(
                    transaction.transaction_total -
                      (transaction.transaction_total *
                        transaction.transaction_discount) /
                        100
                  )}
                </TableCell>
                <TableCell>
                  <p
                    className={`${statusStyle} ${
                      transaction.transaction_status == "paid"
                        ? "text-green-600 bg-green-200"
                        : transaction.transaction_status == "cancelled"
                        ? "text-red-600 bg-red-200"
                        : "text-yellow-600 bg-yellow-100"
                    }`}
                  >
                    {transaction.transaction_status}
                  </p>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button className="bg-blue-400">
                        <ReceiptText />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle className="font-bold text-lg">
                        Transaction Items
                      </DialogTitle>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transaction.items.map((value: any, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                {value.products.product_name}
                              </TableCell>
                              <TableCell>{value.item_qty}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {transaction.transaction_status == "pending" ? (
                    <div className="flex gap-1">
                      <Button
                        className="bg-green-500"
                        onClick={() =>
                          updateTransactions({
                            transaction_id: transaction.transaction_id,
                            transaction_status: "paid",
                          })
                        }
                      >
                        <Check />
                      </Button>
                      <Button
                        className="bg-red-400"
                        onClick={() =>
                          updateTransactions({
                            transaction_id: transaction.transaction_id,
                            transaction_status: "cancelled",
                          })
                        }
                      >
                        <X />
                      </Button>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (current_page > 1) {
                  fetchTransactions(current_page - 1);
                } else {
                  toast.info("No Data");
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: 3 }, (_, i) => {
              const number = current_page + i;
              if (number > last_page) return;
              return (
                <PaginationLink
                  key={i}
                  onClick={() => fetchTransactions(number)}
                >
                  {number}
                </PaginationLink>
              );
            })}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (current_page < last_page) {
                  fetchTransactions(current_page + 1);
                } else {
                  toast.info("No Data ");
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
