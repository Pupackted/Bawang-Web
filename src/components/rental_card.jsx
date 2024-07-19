import React from "react";
import "@/app/App.css";
import Link from "next/link";

export default function RentalCard({ data }) {
  return (
    <Link
      className="item-link"
      href={`/profile/${data.userId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col relative border border-gray-400 rounded-[10px] md:max-w-[200px] ">
          {/* main image */}
          <img
            className="h-[200px] w-[200px] md:h-[200px] md:w-[200px] rounded-tl-[10px] rounded-tr-[10px]"
            src={data.user.image??''}
          />

          <div className="flex flex-col w-full h-[60.23140496%]">
            <div className="flex flex-col">
              <p
                className="font-bold text-[17px] text-[#252b36] mb-0 ml-[10px] mt-[10px] mr-[10px]"
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              >
                {data.displayname}
              </p>
              <p className="font-normal text-[13.6px] text-[#252b36] mt-[3px] ml-[10px] mb-[2px]">
                {data.igName}
              </p>
              <div className="flex flex-row ml-[8px] mt-[10px]">
                <img
                  className="location-img"
                  alt="location icon"
                  src="/asset/images/location.png"
                />
                <p
                  className="font-normal text-[13.6px] text-[#252b36] mb-0 ml-[5px] mt-0 mr-[10px]"
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                >
                  {data.city}
                </p>
              </div>
              <div className="flex flex-row ml-[8px] mt-[5px]">
                <img
                  className="jumlah-kostum-img"
                  alt="kostum count"
                  src="/asset/images/pensilkuning.png"
                />
                <p
                  className="font-normal text-[13.6px] text-[#f9b115] mb-0 ml-[5px] mt-0 mr-[10px]"
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                >
                  {data.costumes.length} Kostum
                </p>
              </div>
              <div className="h-5"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
