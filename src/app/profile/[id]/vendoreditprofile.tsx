"use client";
import { isEqual } from "lodash";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

type vendor = {
  userId: number;
  vendorId: number;
  displayname: string;
  igName: string;
  contact: string;
  province: string;
  city: string;
  sendOverseas: boolean;
  weekdays: boolean;
  description: string;
};

export default function VendorEditProfile({ vendorData, owner }) {
  const [vendor, setVendor] = useState<vendor>(vendorData);
  const [editMode, setEditMode] = useState(true);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setVendor((values) => ({ ...values, [name]: value }));
  }

  const handleSliderChange = (event) => {
    const name = event.target.name;
    setVendor((values) => ({ ...values, [name]: !values[name] }));
  };

  const handleEditButton = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault;

    if (!isEqual(vendor, vendorData)) {
      const res = await fetch("/api/vendor", {
        method: "POST",
        body: JSON.stringify(vendor),
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

  if (!vendorData) {
    return (
      <div className="col-span-9 ml-4 flex flex-col font-segoe-ui">
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
          Vendor Profile
        </p>
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
      {owner && (
        <button
          onClick={handleEditButton}
          className="text-white font-bold rounded-[6.38px] px-5 h-[50px] mb-[0px] md:hidden"
          style={{ backgroundColor: "#AC25EB" }}
        >
          Edit profile
        </button>
      )}

      <form action={handleSubmit} className="flex flex-col">
        <label
          htmlFor="displayname"
          className="flex flex-col items-start md:mt-[0px] mt-[20px] mb-5 text-base text-gray-800"
        >
          <p>Display Name</p>
          <input
            onChange={handleChange}
            value={vendor.displayname}
            type="text"
            name="displayname"
            id="displayname"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            disabled={editMode}
          />
        </label>
        <label
          htmlFor="igName"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Instagram</p>
          <input
            onChange={handleChange}
            value={vendor.igName}
            type="text"
            name="igName"
            id="igName"
            placeholder="@jason.bourne"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            disabled={editMode}
          />
        </label>
        <label
          htmlFor="contact"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Nama kontak</p>
          <input
            onChange={handleChange}
            value={vendor.contact}
            type="text"
            name="contact"
            id="contact"
            placeholder="Jason Bourne"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            disabled={editMode}
          />
        </label>
        <label
          htmlFor="province"
          className="flex flex-col items-start mb-5 text-base text-gray-800 "
        >
          <p>Provinsi</p>
          <input
            onChange={handleChange}
            value={vendor.province}
            type="text"
            name="province"
            id="province"
            placeholder="Banten"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            disabled={editMode}
          />
        </label>
        <label
          htmlFor="city"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Kota</p>
          <input
            onChange={handleChange}
            value={vendor.city}
            type="text"
            name="city"
            id="city"
            placeholder="Tangerang"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            disabled={editMode}
          />
        </label>
        <div className="flex items-center mt-2">
          <label
            className="relative inline-block w-10 mr-2 h-5"
            htmlFor="weekdays"
          >
            <input
              type="checkbox"
              checked={vendor.weekdays}
              name="weekdays"
              id="weekdays"
              onChange={handleSliderChange}
              className="opacity-0 w-0 h-0 peer"
              disabled={editMode}
            />
            <span
              className="absolute top-0 left-0 right-0 bottom-0  transition-all duration-400 block w-full h-6 bg-gray-300 rounded-full shadow-inner cursor-pointer
                    before:absolute before:h-[18px] before:w-[18px] before:bg-white before:rounded-full before:left-[3px] before:bottom-[3px] before:transition-all duration-400
                    peer-checked:bg-[#2196f3] peer-checked:before:translate-x-4 peer-disabled:bg-gray-300"
            ></span>
          </label>
          <span className="ml-2 font-segoe text-[#333] text-base font-normal mt-1">
            Bisa Sewa Weekday?
          </span>
        </div>
        <div className="flex items-center mt-2 ">
          <label
            className="relative inline-block w-10 mr-2 h-5"
            htmlFor="sendOverseas"
          >
            <input
              type="checkbox"
              checked={vendor.sendOverseas}
              name="sendOverseas"
              id="sendOverseas"
              onChange={handleSliderChange}
              className="opacity-0 w-0 h-0 peer"
              disabled={editMode}
            />
            <span
              className="absolute top-0 left-0 right-0 bottom-0  transition-all duration-400 block w-full h-6 bg-gray-300 rounded-full shadow-inner cursor-pointer
                    before:absolute before:h-[18px] before:w-[18px] before:bg-white before:rounded-full before:left-[3px] before:bottom-[3px] before:transition-all duration-400
                    peer-checked:bg-[#2196f3] peer-checked:before:translate-x-4 peer-disabled:bg-gray-300"
            ></span>
          </label>
          <span className="ml-2 font-segoe text-[#333] text-base font-normal mt-1">
            Bisa Kirim luar pulau?
          </span>
        </div>
        <label
          htmlFor="description"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p className="mt-10">Profile Description</p>
          <textarea
            onChange={handleChange}
            value={vendor.description}
            name="description"
            id="description"
            placeholder="Lorem Ipsum Dolor Sit Amet"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0"
            disabled={editMode}
            rows={5}
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
