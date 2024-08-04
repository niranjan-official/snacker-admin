import React from "react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { PaymentType } from "@/types";
import Payment from "@/components/menu/Payment";

export const revalidate = 0;
const getPayments = async () => {
  try {
    let payments: PaymentType[] = [];
    const querySnapshot = await getDocs(collection(db, "payments"));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PaymentType, "key">;
      payments.push({ key: doc.id, ...data });
      console.log(doc.id, " => ", doc.data());
    });
    return payments;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};
const page = async () => {
  const payments = await getPayments();
  return (
    <div className="flex w-full flex-col gap-4 p-5 px-6 pb-20">
      <div>
        <p className="text-xl font-medium text-neutral-50">Payments List</p>
        <hr className="mb-4 mt-2" />
      </div>
      {payments.map((payment) => (
        <Payment key={payment.key} paymentData={payment} />
      ))}
    </div>
  );
};

export default page;
