"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import CategoryTable from "./table";

export default function TransactionPage() {
  return (
    <>
      <div className="flex justify-between w-full ">
        <h1 className="text-2xl font-bold">Transactions Page</h1>
        <ButtonGroup>
          {/* <RawForm
            isAdd={true}
            data={{
              category_id: 0,
              category_name: "",
            }}
          /> */}
        </ButtonGroup>
      </div>
      <CategoryTable />
    </>
  );
}
