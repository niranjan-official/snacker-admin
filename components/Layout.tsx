"use client";
import React, { useEffect, useState } from "react";
import UpdationSwitch from "./UpdationSwitch";
import Selector from "./Selector";
import { Products } from "@/types";
import { onValue, ref, set } from "firebase/database";
import { db, rtdb } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { VscLoading } from "react-icons/vsc";

const Layout: React.FC<{ products: Products[] }> = ({ products }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [newProducts, setNewProducts] = useState<Products[]>(products);
  const [onUpdate, setOnUpdate] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const starCountRef = ref(rtdb, "onStockUpdation");
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setChecked(data);
      setLoad(false); 
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!load) { 
      set(ref(rtdb, "/"), {
        onStockUpdation: checked,
      });
    }
  }, [checked, load]);

  const handleUpdate = (updatedProduct: Products) => {
    setNewProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.key === updatedProduct.key ? updatedProduct : product
      )
    );
  };

  const updateProducts = async () => {
    setOnUpdate(true);
    try {
      const updatePromises = newProducts.map((product) => {
        const productRef = doc(db, "products", product.key);
        return updateDoc(productRef, {
          position: product.position,
          stock: product.stock,
        });
      });

      await Promise.all(updatePromises);
      console.log("All products updated successfully");
      setChecked(false);
    } catch (error) {
      console.error("Error updating products:", error);
    }
    setOnUpdate(false);
  };

  return (
    <div className="flex flex-col">
      <div className="my-4 flex flex-col">
        <hr className="border border-zinc-400/70" />
        <div className="flex w-full justify-between py-2">
          <span>Enable it to update the stock</span>
          <UpdationSwitch checked={checked} setChecked={setChecked} />
        </div>
        <hr className="border border-zinc-400/70" />
      </div>
      {!load ? (
        <div className={`${!checked ? "pointer-events-none opacity-50" : ""}`}>
          <div
            className={`flex w-full flex-wrap gap-6 ${
              !checked ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {[5,6,3,4,1,2].map((position) => (
              <Selector
                key={position}
                position={position}
                products={newProducts}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
          <button
            disabled={onUpdate}
            onClick={updateProducts}
            className="mt-4 w-full rounded-lg bg-blue-900 p-2 text-white"
          >
            {onUpdate ? (
              <VscLoading
                size={20}
                className="flex w-full animate-spin items-center justify-center"
              />
            ) : (
              "Update"
            )}
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <VscLoading size={20} className="animate-spin text-blue-900" />
        </div>
      )}
    </div>
  );
};

export default Layout;
