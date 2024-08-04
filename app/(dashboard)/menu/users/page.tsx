import React from "react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { UserType } from "@/types";
import User from "@/components/menu/User";

export const revalidate = 0;
const getUsers = async () => {
  try {
    let users: UserType[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<UserType, "key">;
      users.push({ key: doc.id, ...data });
      console.log(doc.id, " => ", doc.data());
    });
    return users;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};
const page = async () => {
  const users = await getUsers();
  console.log(users);

  return (
    <div className="flex w-full flex-col gap-4 p-5 px-6 pb-20">
      <div>
        <p className="text-xl font-medium text-neutral-50">Users List</p>
        <hr className="mb-4 mt-2" />
      </div>
      {users.map((user) => (
        <User key={user.key} userData={user} />
      ))}
    </div>
  );
};

export default page;
