"use client";
import { Products } from "@/types";
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaAnglesDown } from "react-icons/fa6";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface SelectorProps {
  position: number;
  products: Products[];
  onUpdate: (updatedProduct: Products) => void;
}

const Selector = ({ position, products, onUpdate }: SelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [stock, setStock] = useState("");

  const selectedProduct = products.find((product) => product.key === value);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    setAlertOpen(true);
  };

  const handleSubmit = () => {
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        stock: parseInt(stock),
        position,
      };
      onUpdate(updatedProduct);
    }
    setAlertOpen(false);
  };

  const initialProduct = products.find(
    (product) => product.position === position,
  );

  return (
    <div className="relative flex h-32 w-[calc(50%-1rem)] items-center justify-center rounded-lg bg-blue-600">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className="flex h-full w-full flex-col items-center justify-center text-white"
          >
            {initialProduct ? (
              <>
                <img
                  src={initialProduct.imgSrc}
                  alt={initialProduct.name}
                  className="h-full w-full rounded-lg object-cover shadow"
                />
                <span className="absolute bottom-3 right-3 rounded-lg bg-white bg-opacity-10 p-1 px-3 text-lg font-bold text-white backdrop-blur-lg backdrop-filter">
                  {initialProduct.stock}
                </span>
              </>
            ) : (
              <>
                <span className="text-3xl font-extrabold">{position}</span>
                <FaAnglesDown size={30} />
              </>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search product..." />
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {products.map((product) => (
                  <CommandItem
                    key={product.key}
                    value={product.key}
                    onSelect={handleSelect}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === product.key ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {product.name}
                    </div>
                    <span className="ml-4 text-gray-500">{product.stock}</span>
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Enter Stock for {selectedProduct?.name}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the stock amount for the selected product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4">
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock amount"
              className="w-full rounded border p-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Selector;
