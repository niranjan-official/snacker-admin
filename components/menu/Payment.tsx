"use client";
import { db } from "@/firebase/config";
import { FirebaseDate, PaymentType } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Payment = ({ paymentData }: { paymentData: PaymentType }) => {
  const [username, setUsername] = useState<string>();
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    try {
      const docRef = doc(db, "users", paymentData.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const name = docSnap.data().name;
        setUsername(name);
        setLoad(false);
      } else {
        console.log("No such document!");
      }
    } catch (e) {}
  };
  function formatDateToYYYYMMDD(date: FirebaseDate) {
    let newDate = new Date(date.seconds * 1000);
    console.log(newDate);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <div className="bg-dark-100 flex w-full flex-col gap-1 rounded-lg p-4 text-neutral-50 shadow shadow-blue-500">
      <div className="flex gap-2 text-neutral-400">
        Name:{" "}
        <span className="text-lg font-medium capitalize text-neutral-50">
          {username}
        </span>
      </div>
      <div className="flex gap-2 text-neutral-400">
        Order Id:{" "}
        <div className="w-1/2 truncate text-neutral-50">
          {paymentData.orderId}
        </div>
      </div>
      <div className="flex gap-2 text-neutral-400">
        User Id:{" "}
        <div className="w-1/2 truncate text-neutral-50">
          {paymentData.userId}
        </div>
      </div>
      <div className="flex gap-2 text-neutral-400">
        Amount:{" "}
        <span className="text-lg font-medium capitalize text-neutral-50">
          {paymentData.amount}
        </span>
      </div>
      <div className="flex gap-2 text-neutral-400">
        Date of Reg:{" "}
        <span className="text-lg font-medium capitalize text-neutral-50">
          {formatDateToYYYYMMDD(paymentData.timeStamp)}
        </span>
      </div>
    </div>
  );
};

export default Payment;
