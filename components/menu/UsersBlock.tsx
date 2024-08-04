import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";

const UsersBlock = () => {
  return (
    <Link
      href={"/menu/users"}
      className="bg-dark-100 flex w-full justify-between rounded-lg p-4 shadow shadow-blue-500"
    >
      <h3 className="text-xl font-semibold text-neutral-50/80">Users List</h3>
      <FaUsers size={30} className="text-white/20" />
    </Link>
  );
};

export default UsersBlock;
