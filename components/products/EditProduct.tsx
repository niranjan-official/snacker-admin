import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Products } from "@/types";
import { VscLoading } from "react-icons/vsc";

interface EditProductProps {
  product: Products;
  onUpdate: (product: Products) => Promise<{ success: boolean }>;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onUpdate }) => {
  const [value, setValue] = useState<Products>(product);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoad(true);
    try {
      const res = await onUpdate(value);
      if (res.success) {
        console.log("Successfully Edited");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log("Edit Failed");
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
    setOpen(false);
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button className="rounded-lg bg-blue-500 p-1 px-4 text-white">
            Edit
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-lg bg-dark-200 text-neutral-50 p-6 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Edit Product
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="my-4 flex w-full flex-col space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-400"
              >
                Name
              </label>
              <input
                id="name"
                className="mt-1 w-full rounded-md shadow bg-dark-100 text-neutral-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="name"
                value={value.name}
                type="text"
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-neutral-400"
              >
                Price
              </label>
              <input
                id="price"
                className="mt-1 w-full rounded-md shadow bg-dark-100 text-neutral-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="price"
                value={value.price}
                type="text"
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-neutral-400"
              >
                Stock
              </label>
              <input
                id="stock"
                className="mt-1 w-full rounded-md shadow bg-dark-100 text-neutral-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="stock"
                value={value.stock}
                type="text"
                onChange={handleChange}
                placeholder="Stock"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-neutral-400"
              >
                Category
              </label>
              <input
                id="category"
                className="mt-1 w-full rounded-md shadow bg-dark-100 text-neutral-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="category"
                value={value.category}
                type="text"
                onChange={handleChange}
                placeholder="Category"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="mr-2 rounded-md bg-gray-200 text-black w-full px-4 py-2 hover:bg-gray-300">
              Cancel
            </AlertDialogCancel>
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
            >
              {load ? (
                <VscLoading size={20} className="animate-spin" />
              ) : (
                "Confirm"
              )}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditProduct;
