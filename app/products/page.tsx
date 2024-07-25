import AddProduct from "@/components/products/AddProduct";
import ProductBlock from "@/components/products/ProductBlock";
import { db } from "@/firebase/config";
import { Products } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React from "react";

export const revalidate = 0;
const getProducts = async () => {
  try {
    let products: Products[] = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Products, "key">;
      products.push({ key: doc.id, ...data });
      console.log(doc.id, " => ", doc.data());
    });
    return products;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};

const deleteProduct = async (productId: string) => {
  "use server";
  try {
    await deleteDoc(doc(db, "products", productId));
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const onUpdate = async (product: Products) => {
  "use server";
  try {
    const updateRef = doc(db, "products", product.key);

    await updateDoc(updateRef, {
      name: product.name,
      price: product.price,
      stock: product.stock,
      reserved: product.reserved,
      category: product.category,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const page = async () => {
  const products = await getProducts();
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-100 p-6 px-4 pb-20">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-2xl font-semibold">Product List</h3>
        <AddProduct />
      </div>
      <hr className="my-3" />
      <div className="flex w-full flex-col gap-4">
        {products.map((product) => (
          <ProductBlock
            key={product.key}
            product={product}
            deleteProduct={deleteProduct}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
