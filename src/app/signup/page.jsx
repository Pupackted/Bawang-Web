"use client";
import React from "react";
import signUp from "@/backend/firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { sendCustomerToDB } from "@/backend/server_actions/signup";

function Page() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    if (username.length < 5) {
      toast.error("Username must be at least 5 characters.", {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }

    const { result, error } = await signUp(email, password);

    if (error) {
      console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already in use.", {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          return;

        case "auth/weak-password":
          toast.error("Your password is too weak.", {
            position: "top-center",
            theme: "colored",
            autoClose: 3000,
          });
          return;

        case "auth/invalid-email":
          toast.error("Invalid email.", {
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

    // send to db
    try {
      await sendCustomerToDB(email, username);
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }

    // else successful
    console.log(result);
    return router.push("/");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 font-normal font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full text-center mt-5">
        <h1 className="mb-8 text-2xl text-gray-800">Sign up</h1>
        <form onSubmit={handleForm} className="flex flex-col">
          <label
            htmlFor="username"
            className="flex flex-col items-start mb-5 text-base text-gray-800"
          >
            <p>Username</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              type="username"
              name="username"
              id="username"
              placeholder="Jason Bourne"
              className="w-full p-2 mt-1 border border-gray-300 rounded text-base"
            />
          </label>
          <label
            htmlFor="email"
            className="flex flex-col items-start mb-5 text-base text-gray-800"
          >
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
          <label
            htmlFor="password"
            className="flex flex-col items-start mb-5 text-base text-gray-800"
          >
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
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 border-none rounded text-white text-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>
        <div className="flex flex-row text-sm font-normal font-sans">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="text-purple-600">
              Login!
            </Link>
          </p>
        </div>
        <p className="text-sm font-normal font-sans mt-[20px]">Or</p>
        <Link href="/vendorsignup" passHref>
          <button className="px-5 py-1 bg-white border border-blue-600 rounded text-blue-600 text-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:text-white mt-[20px]">
            Sign up as a vendor
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
