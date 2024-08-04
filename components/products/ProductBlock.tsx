"use client";
import { Products } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

interface ProductBlockProps {
  product: Products;
  deleteProduct: (productId: string) => Promise<{ success: boolean }>;
  onUpdate: (product: Products) => Promise<{ success: boolean }>;
}
const ProductBlock = ({
  product,
  deleteProduct,
  onUpdate,
}: ProductBlockProps) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (product.position > 0) {
      setActive(true);
    }
  }, []);
  return (
    <div className="relative flex w-full gap-3 rounded-lg bg-dark-100 p-3 shadow">
      <div className="flex aspect-square w-[50%] justify-center bg-zinc-700">
        <Image
          src={product.imgSrc}
          width={80}
          height={80}
          alt={product.name}
          className="h-full w-auto"
        />
      </div>
      <div className="flex w-full flex-col">
        <h2 className="text-xl font-semibold text-neutral-50">{product.name}</h2>
        <div className="mt-2 flex items-center gap-5">
          <span className="bg-neutral-100/20 text-neutral-100 p-1">stock: {product.stock}</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <EditProduct product={product} onUpdate={onUpdate} />
          <DeleteProduct
            productId={product.key}
            deleteProduct={deleteProduct}
          />
        </div>
      </div>
      <div
        className={`absolute right-3 top-3 size-3 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`}
      ></div>
    </div>
  );
};

export default ProductBlock;
