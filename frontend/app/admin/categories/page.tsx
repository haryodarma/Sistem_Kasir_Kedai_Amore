"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import CategoryTable from "./table";
import CategoryForm from "./form";

export default function AdminCategoryPage() {
  return (
    <>
      <div className="flex justify-between w-full ">
        <h1 className="text-2xl font-bold">Product Categories Page</h1>
        <ButtonGroup>
          <CategoryForm
            isAdd={true}
            data={{
              category_id: 0,
              category_name: "",
            }}
          />
        </ButtonGroup>
      </div>
      <CategoryTable />
    </>
  );
}
