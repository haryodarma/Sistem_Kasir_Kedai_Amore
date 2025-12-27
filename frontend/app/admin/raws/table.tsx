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

import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRawStore } from "./stores";
import { useShallow } from "zustand/react/shallow";
import Loading from "@/components/loading";
import { ButtonGroup } from "@/components/ui/button-group";
import RawForm from "./form";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function RawTable() {
  const [dialog, setDialog] = useState(false);
  const { data, current_page, last_page, is_loading, fetchRaws, deleteRaw } =
    useRawStore(
      useShallow((state) => ({
        data: state.data,
        current_page: state.current_page,
        last_page: state.last_page,
        is_loading: state.is_loading,
        fetchRaws: state.fetchRaws,
        deleteRaw: state.deleteRaw,
      }))
    );

  useEffect(() => {
    fetchRaws(1);
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
              <TableCell>Name</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Last Update</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product: any, index) => (
              <TableRow key={index}>
                <TableCell className="w-25">{index + 1}</TableCell>
                <TableCell>{product.raw_name}</TableCell>
                <TableCell className="w-25">{product.raw_stock}</TableCell>
                <TableCell className="w-25">{product.raw_unit}</TableCell>
                <TableCell>{product.updated_at}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <RawForm
                      isAdd={false}
                      data={{
                        raw_id: product.raw_id,
                        raw_name: product.raw_name,
                        raw_stock: product.raw_stock,
                        raw_unit: product.raw_unit,
                      }}
                    />
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          variant="outline"
                          className="bg-red-300"
                          onClick={() => {
                            setDialog(true);
                          }}
                        >
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Delete {product.raw_name} ?</DialogTitle>
                        <DialogFooter>
                          <DialogClose>
                            <Button onClick={() => setDialog(false)}>
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            className="bg-red-400 text-white"
                            onClick={() => deleteRaw(product.raw_id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </ButtonGroup>
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
                  fetchRaws(current_page - 1);
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
                <PaginationLink key={i} onClick={() => fetchRaws(number)}>
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
                  fetchRaws(current_page + 1);
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
