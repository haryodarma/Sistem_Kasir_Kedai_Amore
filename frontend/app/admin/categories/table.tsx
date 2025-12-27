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
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import Loading from "@/components/loading";
import { ButtonGroup } from "@/components/ui/button-group";
import { useEffect } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CategoryData, useCategoryStore } from "../categories/stores";
import CategoryForm from "./form";

export default function CategoryTable() {
  const {
    data,
    current_page,
    last_page,
    is_loading,
    fetchCategories,
    deleteCategory,
  } = useCategoryStore(
    useShallow((state) => ({
      data: state.data,
      current_page: state.current_page,
      last_page: state.last_page,
      is_loading: state.is_loading,
      fetchCategories: state.fetchCategories,
      deleteCategory: state.deleteCategory,
    }))
  );

  useEffect(() => {
    fetchCategories(1);
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((category: CategoryData, index) => (
              <TableRow key={index}>
                <TableCell className="w-25">{index + 1}</TableCell>
                <TableCell>{category.category_name}</TableCell>

                <TableCell>
                  <ButtonGroup>
                    <CategoryForm
                      isAdd={false}
                      data={{
                        category_id: category.category_id,
                        category_name: category.category_name,
                      }}
                    />
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="outline" className="bg-red-300">
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>
                          Delete {category.category_name} ?
                        </DialogTitle>
                        <DialogFooter>
                          <DialogClose>
                            <Button>Cancel</Button>
                          </DialogClose>
                          <Button
                            className="bg-red-400 text-white"
                            onClick={() => deleteCategory(category.category_id)}
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
                  fetchCategories(current_page - 1);
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
                <PaginationLink key={i} onClick={() => fetchCategories(number)}>
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
                  fetchCategories(current_page + 1);
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
