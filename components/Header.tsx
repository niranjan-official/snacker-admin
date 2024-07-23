import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-between p-4 py-3 shadow-md z-50">
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-neutral-600">SNACKER</h2>
        <h3 className="text-3xl font-extrabold text-black">Admin Panel</h3>
      </div>
      <Image src={'/prc-logo.png'} width={60} height={60} alt="logo" />
    </div>
  );
};

export default Header;
