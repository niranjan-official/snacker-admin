import Order from "@/components/menu/Order";
import { db } from "@/firebase/config";
import { OrderType } from "@/types";

import { collection, getDocs } from "firebase/firestore";
import React from "react";

export const revalidate = 0;
const getOrders = async () => {
  try {
    let orders: OrderType[] = [];
    const querySnapshot = await getDocs(collection(db, "orders"));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<OrderType, "key">;
      orders.push({ key: doc.id, ...data });
      console.log(doc.id, " => ", doc.data());
    });
    return orders;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};
const page = async () => {
  const orders = await getOrders();
  console.log(orders);

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <p className="text-xl font-medium text-neutral-50">Orders List</p>
        <hr className="mb-4 mt-2" />
      </div>
      {orders.map((order) => (
        <Order key={order.key} orderData={order} />
      ))}
    </div>
  );
};

export default page;
