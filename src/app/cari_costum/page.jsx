"use client";

import React, { useEffect, useState } from "react";
import "./cari_kostum.css";
import getCollection from "@/backend/firebase/getCollection";
import CostumeCard from "@/components/costumeCard";
import { useSearchParams } from "next/navigation";

export default function CariCostum() {
  const params = useSearchParams();

  const isEmpty = (obj) =>
    Object.values(obj).every((x) => x === null || x === "");

  const [searchQuery, setSearchQuery] = useState({
    string: params.get("string") ?? "",
    province: params.get("province") ?? "",
    city: params.get("city") ?? "",
    size: params.get("size") ?? "",
    gender: params.get("gender") ?? "",
    sewaWeekday: false,
    luarPulau: false,
  });

  useEffect(() => {
    // adrian nyoba nyoba kwkw
    // adrian nyoba nyoba wkwk end
  }, [searchQuery]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSliderChange = (event) => {
    const name = event.target.name;
    setSearchQuery((values) => ({ ...values, [name]: !values[name] }));
  };

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    searchFunction();
  }, [searchQuery]);

  const searchFunction = () => {
    const result = costumes.filter((costume, idx) => {
      return (
        (searchQuery.string === "" ||
          costume.title
            .toLowerCase()
            .includes(searchQuery.string.toLowerCase())) &&
        (searchQuery.province === "" ||
          costume.vendor.province
            .toLowerCase()
            .includes(searchQuery.province.toLowerCase())) &&
        (searchQuery.city === "" ||
          costume.vendor.city
            .toLowerCase()
            .includes(searchQuery.city.toLowerCase())) &&
        (searchQuery.size === "" ||
          costume.size
            .toLowerCase()
            .includes(searchQuery.size.toLowerCase())) &&
        (searchQuery.sewaWeekday === false ||
          costume.vendor.weekdays === searchQuery.sewaWeekday) &&
        (searchQuery.luarPulau === false ||
          costume.vendor.sendOverseas === searchQuery.luarPulau)
      );
    });
    console.log("result", result);
    setSearchResult(result);
  };

  const [costumes, setCostumes] = useState([
    {
      costumeId: 5,
      title: "Asuna Cosplay Lmao",
      image:
        "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2F7f9c45593cf4f90d8ad7be7e31231e5edda09606.jpg?alt=media&token=e965b753-442a-4044-bb7a-8dfcead5079c",
      price: "100k / 3 days",
      tag: "Maker Lokal",
      sauce: "Blue Archive",
      size: "M",
      gender: "Female",
      details: "waow\\nwaow\\nwaoow",
      rules: "waow",
      disclaimer: "waow",
      VendorId: 1,
      vendor: {
        vendorId: 1,
        displayname: "Gigachad Cosrent",
        igName: "@sigma.male",
        contact: "maxwin",
        province: "Banten",
        city: "BSD",
        sendOverseas: true,
        weekdays: true,
        description: null,
        userId: 5,
        user: {
          image:
            "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/users%2F5%2Fad8b504259e0fa2a1aafec0c0d62beade9c32538.jpg?alt=media&token=bd4a9009-4441-445d-90b0-ceb080a01eb3",
        },
      },
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/costumes/`);
      const json = await res.json();
      if (res.status === 200) {
        console.log(json);
        setCostumes(json);
      } else {
        console.log(json);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (costumes) {
      setSearchResult(
        costumes.filter((costume, idx) => {
          return (
            (searchQuery.string === "" ||
              costume.title
                .toLowerCase()
                .includes(searchQuery.string.toLowerCase())) &&
            (searchQuery.province === "" ||
              costume.vendor.province
                .toLowerCase()
                .includes(searchQuery.province.toLowerCase())) &&
            (searchQuery.city === "" ||
              costume.vendor.city
                .toLowerCase()
                .includes(searchQuery.city.toLowerCase())) &&
            (searchQuery.size === "" ||
              costume.size
                .toLowerCase()
                .includes(searchQuery.size.toLowerCase())) &&
            (searchQuery.sewaWeekday === false ||
              costume.vendor.weekdays === searchQuery.sewaWeekday) &&
            (searchQuery.luarPulau === false ||
              costume.vendor.sendOverseas === searchQuery.luarPulau)
          );
        })
      );
    }
  }, [costumes]);

  return (
    <>
      <div>
        {/* start of the whole row*/}
        <div className="flex flex-row md:ml-[5%] mt-[2%] md:mr-[5%]">
          {/* start of the column on the left (sampe bawah) */}
          <div className="hidden md:flex flex-col w-[15%]">
            <p className="font-segoe font-normal text-[32px] text-[#252b36] mt-0 mb-0">
              Cari Kostum
            </p>
            <p className="font-segoe font-normal text-[16px] text-[#252b36c0] mt-[10px] mb-0">
              di Bawang
            </p>
            <p className="text-biru-yg-di-kiri">Series</p>
            <div className="list-container">
              <a href="#" className="list-item">
                Genshin Impact
              </a>
              <a href="#" className="list-item">
                Honkai: Star Rail
              </a>
              <a href="#" className="list-item">
                Blue Lock
              </a>
              <a href="#" className="list-item">
                Jujutsu Kaisen
              </a>
              <a href="#" className="list-item">
                Chainsaw Man
              </a>
              <a href="#" className="list-item">
                Hololive
              </a>
              <a href="#" className="list-item">
                Spy x Family
              </a>
              <a href="#" className="list-item">
                Frieren Beyond Journey&apos;s End
              </a>
              <a href="#" className="list-item">
                Mobile Legends: Bang Bang
              </a>
            </div>
            <p className="text-biru-yg-di-kiri">Karakter</p>
            <div className="list-container">
              <a href="#" className="list-item">
                Yae Miko
              </a>
              <a href="#" className="list-item">
                Kafka
              </a>
              <a href="#" className="list-item">
                Ganyu
              </a>
              <a href="#" className="list-item">
                Silver Wolf
              </a>
              <a href="#" className="list-item">
                Fubuki
              </a>
              <a href="#" className="list-item">
                Suisei
              </a>
              <a href="#" className="list-item">
                Loid Forger
              </a>
              <a href="#" className="list-item">
                Frieren
              </a>
              <a href="#" className="list-item">
                Übel
              </a>
            </div>
            <p className="text-biru-yg-di-kiri">Brand</p>
            <div className="list-container">
              <a href="#" className="list-item">
                Maker Lokal
              </a>
              <a href="#" className="list-item">
                test
              </a>
              <a href="#" className="list-item">
                Wudu
              </a>
              <a href="#" className="list-item">
                UwU
              </a>
              <a href="#" className="list-item">
                Adrian Brand
              </a>
              <a href="#" className="list-item">
                p Brand
              </a>
              <a href="#" className="list-item">
                keeee
              </a>
              <a href="#" className="list-item">
                Serval Brand
              </a>
              <a href="#" className="list-item">
                Polytron
              </a>
            </div>
          </div>
          {/* end of the column on the left (sampe bawah) */}

          {/* start of the column on the right (sampe bawah, yg ada search bar etc.) */}
          <div className="flex flex-col mx-2 md:ml-[5%] md:w-[80%]">
            {/* start ofinner row (buat searchbar, dropdown search (dikiri) and toggles (yg di kanan)) */}
            <div className="flex md:flex-row w-full flex-col">
              {/* start of inner left column (buat searh and dropdown search) */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* start of search */}
                <div className="border-[#dbdfe6] flex items-center bg-white rounded-md overflow-hidden border w-full">
                  <input
                    type="text"
                    className="search-input1 flex-grow p-2 text-[19px] font-normal font-segoe text-[#252b36] mt-0 mb-0"
                    name="string"
                    placeholder="Cari kreator atau produk"
                    value={searchQuery.string}
                    onChange={handleChange}
                  />
                  <div className="border-none outline-none bg-transparent cursor-pointer">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ba9834d873f505839e8f772bf334e9ad5bf65f78aaa81eedf97a7ddfa72af5c?apiKey=8483ae683318450a8a990dafc43c1ead&"
                      alt="search icon"
                      className="search-icon mr-[20px]"
                    />
                  </div>
                </div>

                {/* end of search */}
                {/* start of search dropdown */}
                <div className="md:flex md:flex-row gap-2 mt-2 grid grid-cols-2">
                  <div className="relative inline-block ">
                    <input
                      type="text"
                      className="w-full p-2 border-[#dbdfe6] box-border flex-grow text-[19px] font-normal font-segoe text-[#252b36] border rounded-md"
                      placeholder="Semua Provinsi"
                      name="province"
                      value={searchQuery.province}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative inline-block ">
                    <input
                      type="text"
                      className="w-full border-[#dbdfe6] box-border flex-grow p-2 text-[19px] font-normal font-segoe text-[#252b36] border rounded-md"
                      placeholder="Semua Kota"
                      name="city"
                      value={searchQuery.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative inline-block ">
                    <input
                      type="text"
                      className="w-full border-[#dbdfe6] box-border flex-grow p-2 text-[19px] font-normal font-segoe text-[#252b36] border rounded-md"
                      placeholder="Semua Ukuran"
                      name="size"
                      value={searchQuery.size}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative inline-block ">
                    <input
                      type="text"
                      className="w-full border-[#dbdfe6] box-border flex-grow p-2 text-[19px] font-normal font-segoe text-[#252b36] border rounded-md"
                      placeholder="Semua Gender"
                      name="gender"
                      value={searchQuery.gender}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* end of searchdropdown */}
              </div>
              {/* end of inner left column (buat searh and dropdown search) */}
              {/* start of toggles */}
              <div className="flex md:ml-[2%] flex-row md:flex-col  md:justify-start justify-around max-md:my-4">
                <div className="flex items-center">
                  <label className="relative inline-block w-10 mr-2 h-5">
                    <input
                      type="checkbox"
                      checked={searchQuery.sewaWeekday}
                      name="sewaWeekday"
                      onChange={handleSliderChange}
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
                      checked={searchQuery.luarPulau}
                      name="luarPulau"
                      onChange={handleSliderChange}
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
            {/* end of inner row (buat searchbar, dropdown search (dikiri) and toggles (yg di kanan)) */}
            <p className="font-segoe font-normal text-[15px] text-[#ac25eb] mt-[15px] mb-[5px]">
              {searchResult.length} Kostum ditemukan
            </p>

            {/* start of costume for rent */}

            {/* copy form here */}
            <div className="flex flex-row max-w-full justify-start mt-[5px] ml-0">
              <div
                id="template-container"
                className="grid grid-cols-5 max-md:grid-cols-2 max-md:gap-3 gap-4 max-w-full justify-center"
              >
                {searchResult.map((data) => (
                  <CostumeCard key={data.id} costumeData={data} />
                ))}
              </div>
            </div>

            {/* to here */}

            {/* end of costumes to rent pt 1*/}
          </div>
          {/* end of the column on the right (sampe bawah, yg ada search bar etc.) */}
        </div>
        {/* start of the whole row*/}
        <div style={{ height: 20 }} />
      </div>
    </>
  );
}
