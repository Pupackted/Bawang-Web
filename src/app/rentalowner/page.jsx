'use client'
import React, { useEffect, useState } from "react";
import "./rentalowner.css";
import RentalCard from "@/components/rental_card";
export default function Rentalowner() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/vendor`);
      const json = await res.json();
      if (res.status === 200) {
        console.log(json);
        setRentals(json);
      } else {
        console.log(json);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div>
        {/* row buat tulisan list rental owner and search bar + toggles */}
        <div className="flex flex-col md:flex-row mr-[7%] ml-[7%] mt-[2%]">
          {/* column buat tulisan list rental owner di bawang */}
          <div className="flex flex-col">
            <p
              className="font-normal text-[32px] text-[#252b36] m-0"
              style={{ fontFamily: "Segoe UI, sans-serif" }}
            >
              List Rental Owner di Bawang
            </p>
            <p
              className="font-normal text-[15px] text-[#ac25eb] mt-[10px] mb-[5px]"
              style={{ fontFamily: "Segoe UI, sans-serif" }}
            >
              1203 Rental Owner ditemukan
            </p>
          </div>
          {/* end of column buat tulisan list rental owner di bawang */}
          {/* column buat search bar and toggles */}
          <div className="flex flex-col md:flex-row md:ml-auto mr-0 md:w-[45%] md:h-[50px] ">
            {/* <!-- start of search --> */}
            <div className="flex items-center md:w-[60%] bg-white rounded-[16px] overflow-hidden border border-[#ccc] shadow-[0px_4px_5px_rgba(0,0,0,0.1)]">
              <input
                type="text"
                className="border-none outline-none p-[10px] text-[16px] w-full bg-transparent"
                placeholder="Cari kreator atau produk"
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
              <button className="border-none outline-none bg-transparent cursor-pointer">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ba9834d873f505839e8f772bf334e9ad5bf65f78aaa81eedf97a7ddfa72af5c?apiKey=8483ae683318450a8a990dafc43c1ead&"
                  alt="search icon"
                  className="mr-[20px]"
                />
              </button>
            </div>
            {/* <!-- end of search --> */}

            {/* start of toggles */}
            <div className="flex md:ml-[2%] flex-row md:flex-col  md:justify-start justify-around max-md:my-4">
              <div className="flex items-center">
                <label className="relative inline-block w-10 mr-2 h-5">
                  <input
                    type="checkbox"
                    // checked={searchQuery.sewaWeekday}
                    name="sewaWeekday"
                    // onChange={handleSliderChange}
                    className="opacity-0 w-0 h-0 peer"
                  />
                  <span
                    className="absolute top-0 left-0 right-0 bottom-0  transition-all duration-400 block w-full h-6 md:h-5 bg-gray-300 rounded-full shadow-inner cursor-pointer
                    before:absolute md:before:h-3.5 before:h-[18px] md:before:w-3.5 before:w-[18px] before:bg-white before:rounded-full before:left-[3px] before:bottom-[3px] before:transition-all duration-400
                    peer-checked:bg-[#2196f3] peer-checked:before:translate-x-4"
                  ></span>
                </label>
                <span className="ml-2 font-segoe text-[#333] text-base font-normal mt-1">
                  Sewa weekday
                </span>
              </div>
              <div className="flex items-center">
                <label className="relative inline-block w-10 mr-2 h-5">
                  <input
                    type="checkbox"
                    // checked={searchQuery.luarPulau}
                    name="luarPulau"
                    // onChange={handleSliderChange}
                    className="opacity-0 w-0 h-0 peer"
                  />
                  <span
                    className="absolute top-0 left-0 right-0 bottom-0  transition-all duration-400 block w-full h-6 md:h-5 bg-gray-300 rounded-full shadow-inner cursor-pointer
                    before:absolute md:before:h-3.5 before:h-[18px] md:before:w-3.5 before:w-[18px] before:bg-white before:rounded-full before:left-[3px] before:bottom-[3px] before:transition-all duration-400
                    peer-checked:bg-[#2196f3] peer-checked:before:translate-x-4"
                  ></span>
                </label>
                <span className="ml-2 font-segoe text-[#333] text-base font-normal mt-1">
                  Kirim luar pulau
                </span>
              </div>
            </div>
            {/* end of toggles */}
          </div>
          {/* end of column buat search bar and toggles */}
        </div>

        {/*  end of row buat tulisan list rental owner and search bar + toggles */}
        <p
          className="font-normal text-[20px] md:text-[24px] text-[#252b36] mt-[25px] mb-0 ml-[7%]"
          style={{ fontFamily: "Segoe UI, sans-serif" }}
        >
          Jawa Tengah
        </p>

        {/* start of vendor row  */}
        <div className="flex flex-row max-w-full justify-center mt-[2%] mb-[2%] ml-[7%] mr-[7%]">
          <div
            id="template-container2"
            className="grid grid-cols-5 max-md:grid-cols-2 max-md:mx-1 max-md:gap-3 gap-4 w-full justify-center "
            
          >
            {/* Rental Card */}
            {rentals.map((data) => (
              <RentalCard key={data.id} data={data} />
            ))}
          </div>
        </div>

    

        {/* end of vendor row  */}

        <div style={{ height: 20 }} />
      </div>
    </>
  );
}
