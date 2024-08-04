"use client"; // Ensure this file is client-side only
import Header from "@/components/Header";
import Tab from "@/components/Tab";
import React, { ReactNode, Suspense, useEffect } from "react";
import { useAuth } from "@/firebase/auth";
import Loading from "./loading";

const Layout = ({ children }: { children: ReactNode }) => {
  const User = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-dark-200">
      {User ? (
        <>
          <Header />
          <Suspense fallback={<Loading/>}>
          {children}
          </Suspense>
          <Tab />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Layout;
