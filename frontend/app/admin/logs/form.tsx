"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";
import { CategoryData, useCategoryStore } from "../categories/stores";

export default function CategoryForm({
  isAdd,
  data,
}: {
  isAdd: boolean;
  data: CategoryData;
}) {
  const [name, setName] = useState(data.category_name);
  const [open, setOpen] = useState(false);

  const addData = useCategoryStore((state) => state.addCategory);
  const updateData = useCategoryStore((state) => state.updateCategory);

  const page = "Category";

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        {isAdd ? (
          <Button
            className="bg-green-600"
            size="lg"
            onClick={() => setOpen(true)}
          >
            <Plus /> Add {page}
          </Button>
        ) : (
          <Button className="bg-blue-300" onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {isAdd ? `Add ${page} Material` : `Update ${page} Material`}
          </SheetTitle>
        </SheetHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="name">{page} Name</FieldLabel>
            <Input
              id="name"
              placeholder={isAdd ? `${page} Name` : name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <ButtonGroup>
            <SheetClose>
              <Button
                variant="outline"
                size="lg"
                className="bg-red-300"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              variant="outline"
              size="lg"
              className="bg-green-300"
              onClick={(e) => {
                e.preventDefault();

                if (name != "") {
                  if (isAdd) {
                    addData({
                      category_id: data.category_id,
                      category_name: name,
                    });
                  } else {
                    updateData({
                      category_id: data.category_id,
                      category_name: name,
                    });
                  }
                  setOpen(false);
                }
              }}
            >
              {isAdd ? "Add" : "Update"}
            </Button>
          </ButtonGroup>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
