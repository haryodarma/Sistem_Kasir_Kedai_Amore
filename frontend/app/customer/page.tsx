"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductData, useProductStore } from "../admin/products/stores";
import { useEffect, useState } from "react";
import { url } from "@/services/httpRequest";
import {
  Coffee,
  CupSoda,
  LoaderPinwheel,
  MoveLeft,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/util";
import { CategoryData, useCategoryStore } from "../admin/categories/stores";
import useCustomerStore from "./store";

export default function CustomerPage() {
  const products = useProductStore((state) => state.data);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [isHotC, setIsHotC] = useState<Boolean | null>();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const router = useRouter();

  const categories = useCategoryStore((state) => state.data);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  const tempStyle =
    "border-orange-950  border-2 hover:bg-orange-950 hover:text-white hover:scale-105";
  const catStyle =
    "border-green-950  border-2  hover:bg-green-950 hover:text-white hover:scale-105 ";

  const addOrder = useCustomerStore((state) => state.addOrder);
  const clearOrders = useCustomerStore((state) => state.clearOrders);

  useEffect(() => {
    if (products.length == 0) {
      fetchProducts(1);
    }
    if (categories.length == 0) {
      fetchCategories(1);
    }
  }, []);

  return (
    <>
      <div className="p-5 flex  flex-col gap-3">
        <div className="flex justify-between items-center">
          <Button
            className="bg-orange-900"
            onClick={() => {
              clearOrders();
              router.push("/");
            }}
          >
            <MoveLeft /> Back to Home
          </Button>
          <h1 className="text-5xl  font-bold">Our Menu</h1>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="placeholder:text-xl p-3 border text-lg rounded-lg shadow-md "
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 items-center">
          Temperature :
          <Button
            className={`${tempStyle} ${
              isHotC == null
                ? "bg-transparent text-orange-950"
                : isHotC
                ? "bg-orange-950 text-white"
                : "bg-transparent text-orange-950"
            }`}
            onClick={() => {
              if (isHotC == true) {
                setIsHotC(null);
              } else {
                setIsHotC(true);
              }
            }}
          >
            Hot Drink
          </Button>
          <Button
            className={`${tempStyle} ${
              isHotC == null
                ? "bg-transparent text-orange-950"
                : !isHotC
                ? "bg-orange-950 text-white"
                : "bg-transparent text-orange-950"
            }`}
            onClick={() => {
              if (isHotC == false) {
                setIsHotC(null);
              } else {
                setIsHotC(false);
              }
            }}
          >
            Ice Drink
          </Button>
          Categories :
          {categories.map((value: CategoryData, index) => {
            return (
              <Button
                key={index}
                className={`${catStyle} ${
                  value.category_name.toLowerCase() == category.toLowerCase()
                    ? "bg-green-950 text-white "
                    : "bg-transparent text-green-950 "
                }`}
                onClick={() => {
                  if (value.category_name == category) {
                    setCategory("");
                  } else {
                    setCategory(value.category_name);
                  }
                }}
              >
                {value.category_name}
              </Button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((value: ProductData, index) => {
            if (
              (isHotC == value.is_hot || isHotC == null) &&
              value.product_name.toLowerCase().includes(search.toLowerCase()) &&
              value.category.category_name
                .toLowerCase()
                .includes(category.toLowerCase()) &&
              value.is_active
            ) {
              return (
                <Card
                  key={index}
                  className="transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl"
                >
                  <CardHeader className="gap-2">
                    {/* IMAGE */}
                    <img
                      src={`${url}${value.product_image}`}
                      alt={value.product_name}
                      className="w-full aspect-square rounded-lg object-cover"
                    />

                    {/* TITLE */}
                    <CardTitle className="text-xl font-semibold">
                      {value.product_name}
                    </CardTitle>

                    {/* PRICE */}
                    <p className="text-lg font-bold text-slate-800">
                      {formatRupiah(value.product_price)}
                    </p>

                    {/* META INFO */}
                    <CardDescription className="flex flex-wrap gap-3 pt-2">
                      {/* HOT / ICE */}
                      <div
                        className={`font-semibold flex items-center gap-1 text-sm ${
                          value.is_hot ? "text-red-600" : "text-blue-600"
                        }`}
                      >
                        {value.is_hot ? (
                          <Coffee className="size-4" />
                        ) : (
                          <Snowflake className="size-4" />
                        )}
                        {value.is_hot ? "HOT" : "ICE"}
                      </div>

                      {/* SIZE */}
                      <div className="flex items-center gap-1 text-sm font-semibold text-orange-900">
                        <CupSoda className="size-4" />
                        {value.product_size.toUpperCase()}
                      </div>

                      {/* CATEGORY */}
                      <div className="flex items-center gap-1 text-sm font-semibold text-green-900">
                        <LoaderPinwheel className="size-4" />
                        {value.category.category_name}
                      </div>
                    </CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <Button
                      className="w-full h-10 font-semibold hover:bg-orange-950 transition"
                      onClick={() => addOrder({ item: value, qty: 1 })}
                    >
                      Add to Order
                    </Button>
                  </CardFooter>
                </Card>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
