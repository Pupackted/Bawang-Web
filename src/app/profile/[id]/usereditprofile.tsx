"use client";
import { isEqual } from "lodash";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UserEditProfile({ userData, owner }) {
  const [user, setUser] = useState(userData);
  const [editMode, setEditMode] = useState(true);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  }

  const handleEditButton = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault;

    if (!isEqual(user, userData)) {
      const res = await fetch("/api/vendor", {
        method: "POST",
        body: JSON.stringify(user),
      });
      if (res.status === 200) {
        toast.success("Update Success", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setEditMode(true);
      } else {
        toast.error("Update Failed, Try again", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("You made no changes", {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  if (!userData) {
    return (
      <div className="col-span-9 ml-4 flex flex-col">
        <h1>Vendor Profile</h1>
      </div>
    );
  }

  return (
    <div className="col-span-3 md:col-span-9 ml-4 mr-4 flex flex-col font-segoe-ui">
      {/* newline description */}
      {/* <p dangerouslySetInnerHTML={{__html: vendor.description.replace(/(?:\r\n|\r|\n)/g, '<br>')}}></p> */}
      <div className="flex justify-between">
        <p className="font-bold text-[20px] md:text-[30px] mb-[5%] md:mt-[0px] mt-[10%]">
          Your Profile
        </p>
        {/* button desktop */}
        {owner && (
          <button
            onClick={handleEditButton}
            className="text-white font-bold rounded-[6.38px] px-5 h-[50px] hidden md:block"
            style={{ backgroundColor: "#AC25EB" }}
          >
            Edit profile
          </button>
        )}
      </div>

      {/* button mobile */}
      {owner && (
        <button
          onClick={handleEditButton}
          className="text-white font-bold rounded-[6.38px] px-5 h-[50px] mb-[60px] md:hidden"
          style={{ backgroundColor: "#AC25EB" }}
        >
          Edit profile
        </button>
      )}
      <form action={handleSubmit} className="flex flex-col">
        <label
          htmlFor="username"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Username</p>
          <input
            onChange={handleChange}
            value={user.username}
            type="text"
            name="username"
            id="username"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            disabled={editMode}
          />
        </label>
        <label
          htmlFor="email"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Email</p>
          <input
            onChange={handleChange}
            value={user.email}
            type="text"
            name="email"
            id="email"
            placeholder="@jason.bourne"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            disabled={editMode}
          />
        </label>
        <button
          type="submit"
          className={`text-black font-bold rounded-[6.38px] px-5 h-[50px] ${
            editMode && "hidden"
          }`}
          style={{ backgroundColor: "#FFC600" }}
        >
          Update Info
        </button>
      </form>
    </div>
  );
}
