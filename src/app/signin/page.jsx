"use client";
import React from "react";
import signIn from "@/backend/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Wrong username/password.", {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          return;
        case "auth/too-many-requests":
          toast.error("Too many requests, try again later.", {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          return;
        default:
          toast.error("We're having problems, try again later.", {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          return;
      }
    }

    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 font-normal font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full text-center mt-5">
        <h1 className="mb-8 text-2xl text-gray-800">Sign In</h1>
        <form onSubmit={handleForm} className="flex flex-col">
          <label htmlFor="email" className="flex flex-col items-start mb-5 text-base text-gray-800">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full p-2 mt-1 border border-gray-300 rounded text-base"
            />
          </label>
          <label htmlFor="password" className="flex flex-col items-start mb-5 text-base text-gray-800">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded text-base"
            />
          </label>
          <button type="submit" className="px-5 py-2 bg-blue-600 border-none rounded text-white text-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700">Sign In</button>
          <div className="flex flex-row text-sm font-normal font-sans">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-600">
                Signup!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
