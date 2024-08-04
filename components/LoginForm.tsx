"use client";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [load, setLoad] = useState(false);
  const Router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Router.push("/");
    } catch (err: any) {
      alert(err.message);
      setLoad(false);
    }
  };

  return (
    <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span className="text-neutral-400">Email</span>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="bg-dark-100 text-neutral-50 w-full rounded-md p-3 pl-4 shadow mt-1"
          placeholder="Type your email"
          required
        />
      </label>
      <label htmlFor="">
        <span className="text-neutral-400">Password</span> ]
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="bg-dark-100 text-neutral-50 w-full rounded-md p-3 pl-4 shadow mmt-1"
          placeholder="Type your password"
          required
        />
      </label>
      <div className="w-fit flex items-center gap-2">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="mr-2"
        />
        <label
          htmlFor="rememberMe"
          className="font-poppins text-neutral-400 text-sm"
        >
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="mx-auto flex w-full items-center justify-center gap-1 rounded-md bg-blue-500 py-2 font-semibold text-white shadow"
      >
        {load ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-loader animate-spin"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6l0 -3" />
            <path d="M16.25 7.75l2.15 -2.15" />
            <path d="M18 12l3 0" />
            <path d="M16.25 16.25l2.15 2.15" />
            <path d="M12 18l0 3" />
            <path d="M7.75 16.25l-2.15 2.15" />
            <path d="M6 12l-3 0" />
            <path d="M7.75 7.75l-2.15 -2.15" />
          </svg>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
};
