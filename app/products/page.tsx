import AddProduct from "@/components/products/AddProduct";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

const page = () => {
  return (
    <div className="flex w-full flex-col p-6 px-4 bg-slate-100">
      <AddProduct/>
    </div>
  );
};

export default page;
