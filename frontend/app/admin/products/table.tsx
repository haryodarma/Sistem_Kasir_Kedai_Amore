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

import { Flame, Pen, ReceiptText, Snowflake, Trash } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import Loading from "@/components/loading";
import { useEffect } from "react";
import { formatRupiah } from "@/util";
import { ProductData, useProductStore } from "./stores";
import { url } from "./../../../services/httpRequest";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CategoryTable() {
  const {
    data,
    current_page,
    last_page,
    is_loading,
    fetchProducts,
    deleteProduct,
  } = useProductStore(
    useShallow((state) => ({
      data: state.data,
      current_page: state.current_page,
      last_page: state.last_page,
      is_loading: state.is_loading,
      fetchProducts: state.fetchProducts,
      updateProduct: state.updateProduct,
      addProduct: state.addProduct,
      deleteProduct: state.deleteProduct,
    }))
  );

  const router = useRouter();

  const statusStyle = "rounded-lg py-1 px-3 w-fit";

  useEffect(() => {
    fetchProducts(1);
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
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Hot</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((value: ProductData, index) => (
              <TableRow key={index}>
                <TableCell className="w-25">{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={`${url}${value.product_image}`}
                    width={100}
                    height={100}
                    alt={`${value.product_name} Image`}
                    className="rounded-lg shadow-lg"
                  />
                </TableCell>
                <TableCell>{value.product_name}</TableCell>
                <TableCell>{value.product_size}</TableCell>
                <TableCell>
                  {value.is_hot ? (
                    <Flame className="text-red-400" />
                  ) : (
                    <Snowflake className="text-blue-400" />
                  )}
                </TableCell>
                <TableCell>{value.category.category_name}</TableCell>
                <TableCell>{formatRupiah(value.product_price)}</TableCell>
                <TableCell>
                  <p
                    className={`${statusStyle} ${
                      value.is_active
                        ? "text-green-600 bg-green-300"
                        : "text-red-600 bg-red-400"
                    }`}
                  >
                    {" "}
                  </p>
                </TableCell>
                <TableCell>
                  {/* DIALOG FOR RECIPES */}
                  <Dialog>
                    <DialogTrigger>
                      <Button className="bg-gray-400">
                        <ReceiptText />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle className="font-bold text-lg">
                        Product Recipes
                      </DialogTitle>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Raw</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {value.recipes.map((value: any, index) => (
                            <TableRow>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{value.raw.raw_name}</TableCell>
                              <TableCell>{value.recipe_qty}</TableCell>
                              <TableCell>{value.raw.raw_unit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                    {/* UPDATE FORM */}
                    <Button
                      onClick={() =>
                        router.push(
                          `/admin/products/update/${value.product_id}`
                        )
                      }
                      className="bg-blue-400"
                    >
                      <Pen />
                    </Button>
                  </Dialog>
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
                  fetchProducts(current_page - 1);
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
                <PaginationLink key={i} onClick={() => fetchProducts(number)}>
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
                  fetchProducts(current_page + 1);
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
