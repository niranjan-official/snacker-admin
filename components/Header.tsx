"use client";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-dark-100 z-50 flex w-full items-center justify-between p-4 py-3 shadow-md">
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-neutral-400">SNACKER</h2>
        <h3 className="text-3xl font-extrabold text-neutral-50">Admin Panel</h3>
      </div>
      <Image src={"/snacker.png"} width={60} height={60} alt="logo" />
    </div>
  );
};

export default Header;
