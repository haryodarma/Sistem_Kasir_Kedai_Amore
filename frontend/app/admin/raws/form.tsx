"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { useRawStore } from "./stores";

export default function RawForm({
  isAdd,
  data,
}: {
  isAdd: boolean;
  data: {
    raw_id: number;
    raw_name: string;
    raw_stock: number;
    raw_unit: string;
  };
}) {
  const [name, setName] = useState(data.raw_name);
  const [stock, setStock] = useState(data.raw_stock);
  const [unit, setUnit] = useState(data.raw_unit);
  const [open, setOpen] = useState(false);

  const addRaw = useRawStore((state) => state.addRaw);
  const updateRaw = useRawStore((state) => state.updateRaw);

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        {isAdd ? (
          <Button
            className="bg-green-600"
            size="lg"
            onClick={() => setOpen(true)}
          >
            <Plus /> Add Raw
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
            {isAdd ? "Add Raw Material" : "Update Raw Material"}
          </SheetTitle>
        </SheetHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="name">Raw Name</FieldLabel>
            <Input
              id="name"
              placeholder={isAdd ? "Raw Name" : name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
            <FieldLabel htmlFor="stock">Stock</FieldLabel>
            <Input
              id="stock"
              type="number"
              placeholder={isAdd ? "Raw Stock" : `${stock}`}
              onChange={(e: any) => {
                setStock(e.target.value);
              }}
            />
            <FieldLabel htmlFor="unit">Unit</FieldLabel>
            <Select
              name="unit"
              value={unit}
              onValueChange={(e: any) => {
                setUnit(e);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={isAdd ? "Raw Unit" : unit}>
                  {unit}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Unit</SelectLabel>
                  <SelectItem value="gr">Gram (gr)</SelectItem>
                  <SelectItem value="ml">Mili Liter (ml)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

                if (name != "" || stock != 0 || unit != "") {
                  if (isAdd) {
                    addRaw({
                      raw_id: data.raw_id,
                      raw_name: name,
                      raw_stock: stock,
                      raw_unit: unit,
                    });
                  } else {
                    updateRaw({
                      raw_id: data.raw_id,
                      raw_name: name,
                      raw_stock: stock,
                      raw_unit: unit,
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
