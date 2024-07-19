"use client";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./scroll.css";
import { useSearchParams } from "next/navigation";

export default function Costumes({ params }) {
  const { userData } = useAuthContext() as any;

  const vendorId = params.id;

  const [costumes, setCostumes] = useState([]);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/costumes/${vendorId}`, {});
      const json = await res.json();
      if (res.status === 200) {
        console.log(json);
        setCostumes(json);
        if (userData && (vendorId == userData.vendor?.vendorId ?? 0)) {
          setOwner(true);
        }
      } else {
        console.log(json);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between md:mb-[20px]">
        <p className="font-segoe font-normal text-[32px] text-[#252b36] mt-[10px] md:mt-[20px] md:ml-[40px] ml-[20px] mb-0">
          Costumes List
        </p>
        {owner && (
          <Link
            href={`/edit-or-add`}
            className="hidden md:block py-2 px-4 text-left text-white bg-[#ac25eb] rounded-lg ml-[10px] mr-[40px] mb-[0px] mt-[30px]"
          >
            New Costume
          </Link>
        )}
      </div>
      {owner && (
        <button className=" md:hidden py-2 px-4 text-left text-white bg-[#ac25eb] rounded-lg ml-[20px] w-[40%] mb-[20px] mt-[30px]">
          New Costume
        </button>
      )}
      <div className="flex flex-row md:mx-[40px] mx-[20px] gap-[20px] overflow-x-auto md:overflow-x-visible custom-scrollbar">
        {costumes &&
          costumes.map((costume) => (
            <Link
            href={`/product/${costume.costumeId}`}
              className="flex flex-row mx-[0px] w-[200px] "
              key={costume.costumeId}
            >
              <div className="flex flex-row items-center ">
                <div className="flex flex-col relative border border-gray-400 rounded-[10px] h-[450px] md:max-w-[200px] max-w-[200px]">
                  <img
                    className="h-[200px] w-[200px] rounded-tl-[10px] rounded-tr-[10px]"
                    loading="lazy"
                    src={
                      costume.image ??
                      "https://wallpapers.com/images/featured/solid-grey-ew5fya1gh2bgc49b.jpg"
                    }
                    alt="costume"
                  />
                  <div className="flex flex-col w-[200px] h-[60.23140496%]">
                    <div className="flex flex-row">
                      <div
                        className="flex flex-col ml-[4%] mt-[2%]"
                        style={{ fontFamily: "Segoe UI, sans-serif" }}
                      ></div>
                    </div>
                    <div className="flex flex-col">
                      <p className="item-title">{costume.title}</p>
                      <p className="item-price">{costume.price}</p>
                      <div className="flex flex-row ml-[10px] mt-[5px]">
                        <img
                          className="tag-image"
                          alt="tag"
                          src="/asset/images/tag.png"
                        />
                        <p className="item-tag">{costume.tag}</p>
                      </div>
                      <div className="flex flex-row ml-[10px] mt-[5px]">
                        <img
                          className="tv-image"
                          alt="tv"
                          src="/asset/images/tv.png"
                        />
                        <p className="item-tv">{costume.sauce}</p>
                      </div>
                      
                      <div className="flex flex-row ml-[10px] mt-[5px]">
                        <div
                          style={{
                            border: "1px solid #252b36",
                            borderRadius: 5,
                          }}
                        >
                          <p className="item-size">{"Size: " + costume.size}</p>
                        </div>
                        <div
                          style={{
                            border: "1px solid #252b36",
                            borderRadius: 5,
                            marginLeft: 10,
                          }}
                        >
                          <p className="item-gender ">{costume.gender}</p>
                        </div>
                      </div>
                      {/* =========== wish list ============ */}
                      <div className="mt-[5px] ml-[5px]">
                        {/* dont mind the name item-gender, its just so it can use the styling from it */}
                        <p className="item-gender ">Wishlists: </p>
                      </div>
                      {owner && (
                        <Link
                          href={`/edit-or-add?cid=${costume.costumeId}`}
                          passHref
                        >
                          <button className="text-[#AC25EB] font-segoe-ui text-[15px] cursor-pointer transition-colors duration-300 ease-in-out bg-transparent border-none mt-5 ml-[10px]">
                            Edit Costume
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* ================================================================================= */}
            </Link>
          ))}
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
}
