import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VscLoading } from "react-icons/vsc";

interface DeleteProductProps {
  productId: string;
  deleteProduct: (productId: string) => Promise<{ success: boolean }>;
}
const DeleteProduct = ({ productId, deleteProduct }: DeleteProductProps) => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);

  const Delete = async () => {
    setLoad(true);
    try {
      const res = await deleteProduct(productId);
      if (res.success) {
        console.log("Deleted");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log("Deletion Failed");
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
          <button className="rounded-lg bg-red-500 p-1 px-2 text-white">
            Delete
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <button
              onClick={Delete}
              className="flex w-full justify-center rounded-md bg-red-500 p-2 text-white hover:bg-red-700"
            >
              {load ? (
                <VscLoading size={20} className="animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteProduct;
