import React from "react";
import Image from "next/image";
import {LoginForm} from "@/components/LoginForm";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-dark-200">
      <div className="flex flex-col items-center flex-1 justify-center">
        <Image src="/snacker.png" width={70} height={70} alt="logo"/>
        <p className="font-poppins font-medium text-center text-xl mt-5 text-neutral-50">Login to Snacker Admin</p>
        <LoginForm />
      </div>
    </main>
  );
}
