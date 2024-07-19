"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";

export default function NavBar() {
  const auth = getAuth();
  const { user, userData } = useAuthContext();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfileClick = () => {
    setProfile(!profile);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="header-container flex justify-between items-center py-4 px-8">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                className="ml-2"
                loading="lazy"
                src="../asset/images/Logo-bawang.png"
                alt="logo"
                width="43"
                height="44"
              />
              <p className="font-bold text-purple-500 text-lg ml-2">Bawang</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="center-buttons flex space-x-4 md:flex">
            <Link href="/">
              <button className="btn hidden md:inline-block">Home</button>
            </Link>
            <Link href="/cari_costum">
              <button className="btn hidden md:inline-block">
                Cari kostum
              </button>
            </Link>
            <Link href="/rentalowner">
              <button className="btn hidden md:inline-block">
                List Rental
              </button>
            </Link>
            <button className="btn hidden md:inline-block">Jadwal Event</button>
          </div>

          {/* Mobile Navigation Button */}
          <button className="md:hidden text-black" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* User Info */}
          {userData ? (
            <>
              <div className="relative hidden md:flex">
                <button
                  className={`peer w-[34px] h-[34px] rounded-full focus:outline-none`}
                  onClick={handleProfileClick}
                >
                  <img
                    src={
                      userData.image ??
                      "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
                    }
                    className="w-full h-full rounded-full"
                    alt="Profile Picture"
                  />
                </button>

                <div
                  className={`${
                    profile ? "flex" : "hidden"
                  } flex-col absolute right-0 mt-[10px] z-30 bg-white border border-gray-300 rounded-md shadow-lg `}
                >
                  <button
                    className="py-2 px-4 text-left w-full cursor-pointer focus:outline-none"
                    style={{
                      color: "rgba(8, 10, 12, 0.70)",
                      fontFamily: "Segoe UI",
                      fontWeight: "bold",
                    }}
                    onClick={() => router.push(`/profile/${userData.userId}`)}
                  >
                    {userData.username}
                  </button>
                  <button
                    className="py-2 px-4 text-left w-full cursor-pointer focus:outline-none"
                    style={{
                      color: "rgba(8, 10, 12, 1)",
                      fontFamily: "Segoe UI",
                    }}
                  >
                    Wish List
                  </button>
                  <button
                    className="py-2 px-4 text-left text-white bg-[#ac25eb] rounded-lg ml-[10px] mr-[10px] mb-[10px] mt-[10px]"
                    onClick={() => signOut(auth)}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div
                className={`${profile || "hidden"} inset-0 fixed z-20`}
                onClick={handleProfileClick}
              ></div>
            </>
          ) : (
            <div className="hidden md:flex right-button px-8">
              <button
                onClick={() => router.push("/signup")}
                className="font-bold"
              >
                Gabung Jadi Wibu
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0  bg-opacity-75 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        onClick={toggleSidebar}
      >
        <div className="bg-white w-64 h-full p-4">
          {userData && (
            <button
              className="mb-[25px] text-left w-full cursor-pointer focus:outline-none"
              style={{
                color: "rgba(8, 10, 12, 0.70)",
                fontFamily: "Segoe UI",
                fontWeight: "bold",
              }}
            >
              {userData.username}
            </button>
          )}
          <nav className="flex flex-col space-y-2">
            <Link href="/">
              <button className="btn w-full text-left">Home</button>
            </Link>
            <Link href="/cari_costum">
              <button className="btn w-full text-left">Cari kostum</button>
            </Link>
            <Link href="/rentalowner">
              <button className="btn w-full text-left">List Rental</button>
            </Link>
            <button className="btn w-full text-left">Jadwal Event</button>
            {user ? (
              <div className="flex flex-col text-black mt-4 items-start gap-y-2">
                <button
                  className="text-left w-full cursor-pointer focus:outline-none"
                  style={{
                    color: "rgba(8, 10, 12, 1)",
                    fontFamily: "Segoe UI",
                  }}
                >
                  Wish List
                </button>
                <button
                  className="  py-2 px-5 text-left text-white bg-[#ac25eb] rounded-lg ml-[0px] mr-[10px] mb-[10px] mt-[10px]"
                  onClick={() => signOut(auth)}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/signup")}
                className="bg-[#ac25eb] border-none cursor-pointer rounded-lg font-segoe mr-12 text-white px-4 py-2"
              >
                Gabung Jadi Wibu
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
