"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import CategoryTable from "./table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function TransactionPage() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between flex-1 w-full ">
        <h1 className="text-2xl font-bold">Products Page</h1>
        <ButtonGroup>
          <Button
            className="bg-green-600"
            onClick={() => router.push("/admin/products/add")}
          >
            <Plus /> Add Product
          </Button>
        </ButtonGroup>
      </div>
      <CategoryTable />
    </>
  );
}
