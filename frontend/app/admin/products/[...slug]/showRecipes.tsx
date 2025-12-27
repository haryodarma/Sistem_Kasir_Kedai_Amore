"use client";

import { RawData, useRawStore } from "@/app/admin/raws/stores";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pen, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecipeStore } from "./recipes";
import {
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ShowRecipes() {
  const params = useParams();
  const slug = params.slug as string[]; // ✅ FIX

  const [newRecipe, setNewRecipe] = useState({
    raw_id: 0,
    recipe_qty: 0,
    product_id: 0,
  });

  const {
    recipe_data,

    updateRecipe,
    deleteRecipe,
    fetchRecipesByProduct,
  } = useRecipeStore(
    useShallow((state) => ({
      recipe_data: state.data,

      fetchRecipesByProduct: state.fetchRecipesByProduct,
      updateRecipe: state.updateRecipe,
      deleteRecipe: state.deleteRecipe,
    }))
  );

  const { raw_data, fetchRaws } = useRawStore(
    useShallow((state) => ({
      raw_data: state.data,
      fetchRaws: state.fetchRaws,
    }))
  );

  useEffect(() => {
    fetchRecipesByProduct(Number(slug[1]));
    fetchRaws(1);
  }, [fetchRecipesByProduct, fetchRaws]);

  const productId = Number(slug[1]);

  return (
    <div className="border p-5 rounded-lg">
      <h1 className="font-semibold">PRODUCT RECIPES</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Raw</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recipe_data
            .filter((item: any) => item.product_id === productId) // ✅ FIX
            .map((value: any, index: number) => (
              <TableRow key={value.recipe_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.raw.raw_name}</TableCell>
                <TableCell>{value.recipe_qty}</TableCell>
                <TableCell>{value.raw.raw_unit}</TableCell>
                <TableCell className="flex gap-2">
                  {/* UPDATE */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-500">
                        <Pen />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogTitle>Update Recipe</DialogTitle>

                      <FieldGroup>
                        <FieldContent>
                          <Field>
                            <FieldLabel>Raw</FieldLabel>
                            <Select
                              onValueChange={(value) =>
                                setNewRecipe({
                                  ...newRecipe,
                                  raw_id: Number(value),
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select raw" />
                              </SelectTrigger>
                              <SelectContent>
                                {raw_data.map((raw: RawData) => (
                                  <SelectItem
                                    key={raw.raw_id}
                                    value={String(raw.raw_id)}
                                  >
                                    {raw.raw_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>

                          <Field>
                            <FieldLabel>Quantity</FieldLabel>
                            <Input
                              type="number"
                              onChange={(e) =>
                                setNewRecipe({
                                  ...newRecipe,
                                  recipe_qty: Number(e.target.value),
                                })
                              }
                            />
                          </Field>
                        </FieldContent>
                      </FieldGroup>

                      <DialogFooter>
                        <Button
                          className="bg-blue-500"
                          onClick={() =>
                            updateRecipe({
                              ...newRecipe,
                              recipe_id: value.recipe_id,
                              product_id: productId,
                            }).then(() =>
                              fetchRecipesByProduct(Number(slug[1]))
                            )
                          }
                        >
                          Update
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* DELETE */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-red-500">
                        <Trash />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Delete {value.raw.raw_name}?</DialogTitle>
                      <DialogFooter>
                        <Button
                          className="bg-red-500"
                          onClick={() =>
                            deleteRecipe(value.recipe_id).then(() =>
                              fetchRecipesByProduct(Number(slug[1]))
                            )
                          }
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
