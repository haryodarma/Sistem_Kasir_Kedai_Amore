"use client";

import { CategoryData, useCategoryStore } from "@/app/admin/categories/stores";
import { RawData, useRawStore } from "@/app/admin/raws/stores";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveLeft } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useProductStore } from "../stores";
import { useRouter } from "next/navigation";

import ShowRecipes from "./showRecipes";
import { useRecipeStore } from "./recipes";
import { url } from "@/services/httpRequest";

export default function ProductForm() {
  const params = useParams();
  const slug = params.slug as string;

  const router = useRouter();

  const [image, setImage] = useState("");

  const [product, setProduct] = useState({
    product_name: "",
    product_image: File,
    product_price: 0,
    product_size: "",
    is_hot: 0,
    is_active: 0,
    category_id: 0,
  });

  const [newRecipe, setNewRecipe] = useState({
    raw_id: 0,
    recipe_qty: 0,
    product_id: 0,
  });

  const { category_data, fetchCategories }: any = useCategoryStore(
    useShallow((state) => ({
      category_data: state.data,
      fetchCategories: state.fetchCategories,
    }))
  );

  const { raw_data, fetchRaws } = useRawStore(
    useShallow((state) => ({
      raw_data: state.data,
      fetchRaws: state.fetchRaws,
    }))
  );

  const { product_data, addProduct, updateProduct }: any = useProductStore(
    useShallow((state) => ({
      product_data: state.data,
      addProduct: state.addProduct,
      updateProduct: state.updateProduct,
    }))
  );

  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const fetchRecipesByProduct = useRecipeStore(
    (state) => state.fetchRecipesByProduct
  );

  useEffect(() => {
    if (category_data.length == 0) {
      fetchCategories(1);
    }

    if (raw_data.length == 0) {
      fetchRaws(1);
    }

    if (slug[1] && slug[0] == "update") {
      for (const item of product_data) {
        if (item.product_id == slug[1]) {
          setProduct({ ...item });
          setImage(`${url}${item.product_image}`);
        }
      }
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col flex-1 gap-10">
        <div>
          <Button
            className="bg-orange-900"
            onClick={() => router.push("/admin/products")}
          >
            <MoveLeft /> Back To Product
          </Button>
        </div>
        <FieldGroup className="border p-5 rounded-lg">
          <FieldSet>
            <FieldGroup className="flex flex-row justify-around ">
              <div className="w-full">
                <FieldLegend>
                  {slug[0] == "add" ? "ADD PRODUCT" : "UPDATE PRODUCT"}
                </FieldLegend>
                <Field className="w-1/4">
                  <img
                    src={image ? image : "/images/noimage.jpg"}
                    width={300}
                    className="mt-5 rounded-lg border"
                  />
                  <Input
                    type="file"
                    className="mb-3"
                    onChange={(e: any) => {
                      setProduct({
                        ...product,
                        product_image: e.target.files[0],
                      });
                      setImage(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </Field>
                <div className="flex gap-2">
                  <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Input your product name"
                      value={product.product_name}
                      onChange={(e) =>
                        setProduct({ ...product, product_name: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="name">Price</Label>
                    <Input
                      id="name"
                      type="number"
                      placeholder="Input your product price"
                      value={product.product_price}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          product_price: Number(e.target.value),
                        })
                      }
                    />
                  </Field>
                </div>
                <div className="flex gap-2 my-2">
                  <Field>
                    <Label>Product Size</Label>
                    <Select
                      onValueChange={(value) =>
                        setProduct({ ...product, product_size: value })
                      }
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue
                          placeholder={
                            product.product_size != ""
                              ? product.product_size
                              : "Select a size"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Product Size</SelectLabel>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <Label>Temperature</Label>
                    <Select
                      onValueChange={(value) => {
                        setProduct({ ...product, is_hot: Number(value) });
                      }}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue
                          placeholder={
                            slug[0] == "update"
                              ? product.is_hot
                                ? "Hot"
                                : "Ice"
                              : "Select a temperature"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Temperature</SelectLabel>
                          <SelectItem value="1">Hot</SelectItem>
                          <SelectItem value="0">Ice</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <Label>Category</Label>
                    <Select
                      onValueChange={(value) =>
                        setProduct({ ...product, category_id: Number(value) })
                      }
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue
                          placeholder={category_data.map(
                            (value: CategoryData, index: number) => {
                              if (value.category_id == product.category_id) {
                                return value.category_name;
                              } else if (index + 1 == category_data.length) {
                                return "Select a category";
                              }
                            }
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {category_data.map(
                            (value: CategoryData, index: number) => (
                              <SelectItem
                                key={index}
                                value={`${value.category_id}`}
                              >
                                {value.category_name}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <Label>Product Activation</Label>
                    <Select
                      onValueChange={(value) => {
                        setProduct({ ...product, is_active: Number(value) });
                      }}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue
                          placeholder={
                            slug[0] == "update"
                              ? product.is_hot
                                ? "Actice"
                                : "Not Active"
                              : "Select a activaton"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Activation</SelectLabel>
                          <SelectItem value="1">Active</SelectItem>
                          <SelectItem value="0">Not Active</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    className="bg-green-600"
                    onClick={() => {
                      if (slug[0] == "update") {
                        updateProduct({ ...product }).then(() =>
                          router.push("/admin/products")
                        );
                      } else {
                        addProduct(product).then(() =>
                          router.push("/admin/products")
                        );
                      }
                    }}
                  >
                    {slug[0] == "update" ? "Update Product" : "Add Product"}
                  </Button>
                </div>
                <FieldSeparator className="my-2" />
              </div>
            </FieldGroup>
            {/* SEPARATOR */}
            {slug[0] == "update" ? (
              <FieldGroup className="flex flex-row justify-around">
                <div className="w-full ">
                  <FieldLegend>ADD PRODUCT RECIPE</FieldLegend>

                  <div className="flex gap-3 w">
                    <Field>
                      <Label htmlFor="name">Raw</Label>
                      <Select
                        onValueChange={(value) => {
                          setNewRecipe({ ...newRecipe, raw_id: Number(value) });
                        }}
                      >
                        <SelectTrigger className="w-45">
                          <SelectValue placeholder="Select a raw" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Raws</SelectLabel>
                            {raw_data.map((value: RawData, index: number) => (
                              <SelectItem key={index} value={`${value.raw_id}`}>
                                {value.raw_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <Label htmlFor="qty">Quantity</Label>
                      <Input
                        id="qty"
                        type="number"
                        placeholder="Input your quantity"
                        onChange={(e) =>
                          setNewRecipe({
                            ...newRecipe,
                            recipe_qty: Number(e.target.value),
                          })
                        }
                      />
                    </Field>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button
                      className="bg-green-600"
                      onClick={() => {
                        addRecipe({
                          ...newRecipe,
                          product_id: Number(slug[1]),
                        }).then(() => fetchRecipesByProduct(Number(slug[1])));
                      }}
                    >
                      Add Recipe
                    </Button>
                  </div>
                </div>
              </FieldGroup>
            ) : (
              ""
            )}
          </FieldSet>
        </FieldGroup>
        <ShowRecipes />
      </div>
    </>
  );
}
