import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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

import { Plus, Pen, Trash } from "lucide-react";

export default function AdminProductsPage() {
  const dummyData = [
    {
      id: 1,
      name: "Product A",
      stock: 100,
      unit: "pcs",
      lastUpdate: "2024-06-01",
    },
    {
      id: 2,
      name: "Product B",
      stock: 50,
      unit: "pcs",
      lastUpdate: "2024-06-02",
    },
    {
      id: 3,
      name: "Product C",
      stock: 200,
      unit: "pcs",
      lastUpdate: "2024-06-03",
    },
  ];

  return (
    <>
      <div className="flex justify-between w-full ">
        <h1 className="text-2xl font-bold">Admin Products Page</h1>
        <ButtonGroup>
          <Button variant="outline" size="lg" className="bg-green-300">
            <Plus />
            Tambah Product
          </Button>
        </ButtonGroup>
      </div>
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
          {dummyData.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="w-25">{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="w-25">{product.stock}</TableCell>
              <TableCell className="w-25">{product.unit}</TableCell>
              <TableCell>{product.lastUpdate}</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button variant="outline" className="bg-blue-300">
                    <Pen />
                  </Button>
                  <Button variant="outline" className="bg-red-300">
                    <Trash />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="">1</PaginationLink>
            <PaginationLink href="">2</PaginationLink>
            <PaginationLink href="">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
