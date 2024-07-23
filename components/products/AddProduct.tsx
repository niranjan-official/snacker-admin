"use client";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { VscLoading } from "react-icons/vsc";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";
    setLoad(true);
    if (imageFile) {
      const storageRef = ref(storage, productName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log("Upload faailed", error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              const docRef = await addDoc(collection(db, "products"), {
                name: productName,
                price: parseInt(price),
                category: category,
                position: 1000,
                stock: 0,
                reserved: 0,
                imgSrc: downloadURL,
              });
              console.log("Document written with ID: ", docRef.id);
              imageUrl = downloadURL;
            } catch (error: any) {
              console.log("Product creation Failed");
              alert("Failed " + error.message);
            }
          });
        },
      );
    }
    setLoad(false);

    console.log({
      productName,
      price,
      imageUrl,
      category,
    });

    setProductName("");
    setPrice("");
    setImageFile(null);
    setCategory("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-lg bg-blue-700 p-3 text-xl text-white shadow">
          Add Product
          <IoAddOutline size={30} className="rounded-lg bg-white/10 p-1" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl bg-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Product Details</AlertDialogTitle>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="mt-2">
              Product Name:
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 w-full rounded border p-2"
                required
              />
            </label>
            <label className="mt-2">
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded border p-2"
                required
              />
            </label>
            <label className="mt-2">
              Image:
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 w-full rounded border p-2"
                required
              />
            </label>
            <label className="mt-2">
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded border p-2"
                required
              />
            </label>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={load} type="submit">
                {load ? (
                  <VscLoading
                    size={20}
                    className="flex w-full animate-spin items-center justify-center"
                  />
                ) : (
                  "Add"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddProduct;
