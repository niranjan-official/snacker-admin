"use client";
import Link from "next/link";
import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";

const Tab = () => {
  const pathname = usePathname();
  return (
    <div className="bg-dark-100 fixed bottom-0 left-0 flex w-full items-center justify-evenly border-t border-zinc-500 p-3 py-4">
      <div
        className={`rounded-lg p-1 ${pathname === "/" ? "bg-blue-600 text-white" : "text-blue-600"}`}
      >
        <Link href={"/"}>
          <MdHomeFilled size={27} />
        </Link>
      </div>
      <div
        className={`rounded-lg p-1 ${pathname === "/products" ? "bg-blue-600 text-white" : "text-blue-600"}`}
      >
        <Link href={"/products"}>
          <BsFillGridFill size={20} />
        </Link>
      </div>
      <div
        className={`rounded-lg p-1 ${pathname === "/menu" ? "bg-blue-600 text-white" : "text-blue-600"}`}
      >
        <Link href={"/menu"}>
          <IoMdSettings size={25} />
        </Link>
      </div>
    </div>
  );
};

export default Tab;
