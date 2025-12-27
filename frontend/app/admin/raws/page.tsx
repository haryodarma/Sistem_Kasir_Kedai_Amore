"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import RawForm from "./form";
import RawTable from "./table";

export default function AdminRawPage() {
  return (
    <>
      <div className="flex justify-between w-full ">
        <h1 className="text-2xl font-bold">Raw Materials Page</h1>
        <ButtonGroup>
          <RawForm
            isAdd={true}
            data={{
              raw_id: 0,
              raw_name: "",
              raw_stock: 0,
              raw_unit: "",
            }}
          />
        </ButtonGroup>
      </div>
      <RawTable />
    </>
  );
}
