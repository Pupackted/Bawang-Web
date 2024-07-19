"use client";
import logo from "./logo.svg";
import "./App.css";
import getCollection from "@/backend/firebase/getCollection";
import { useEffect, useState } from "react";
import CostumeCard from "@/components/costumeCard";
import RentalCard from "@/components/rental_card";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

function App() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { user } = useAuthContext();

  // const [costumes, setCostumes] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const { result, error } = await getCollection("Costumes");
  //     if (error) {
  //       setError(error);
  //     } else {
  //       console.log(result);
  //       setCostumes(result);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const [costumes, setCostumes] = useState([]);

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

  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/vendor?limit=true`);
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

  const [searchQuery, setSearchQuery] = useState({
    string: "",
    province: "",
    city: "",
    size: "",
    gender: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      for (const filter in searchQuery) {
        if (Object.hasOwnProperty.call(searchQuery, filter)) {
          const value = searchQuery[filter];
          if (value) {
            params.set(filter, value);
          }
        }
      }
      router.push("/cari_costum?" + params.toString());
    }
  };

  return (
    <>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <div className="topscreen">
          <div className="TitleContainer">
            <div className="titlecolumn1" />
            <div className="titlecolumn2">
              <div style={{ paddingTop: "25%" }} />
              <p className="font-semibold text-white mb-0 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                Dari Bawang Untuk Bawang
              </p>
              <p className="font-segoe text-white text-xl max-w-[70%] mt-4">
                Bawang adalah #1 Asian Pop Culture Creator Hub di Asia Tenggara!
              </p>

              {!user && (
                <div className="button-yellow">
                  <button onClick={() => router.push("/signin")}>Masuk</button>
                </div>
              )}
              <div style={{ marginBottom: "30%" }} />
            </div>
          </div>
        </div>
        <div
          className="container1"
          style={{
            flexDirection: "column",
            display: "flex",
            alignSelf: "stretch",
            position: "relative",
            marginTop: "0%",
          }}
        >
          {/* <p>------------------</p> */}
        </div>
        <div className="middlescreen">
          <p className="text-2xl md:text-3xl font-bold font-segoe text-[#252b36] mt-10 mb-0">
            Platform Sewa Cosplay Indonesia
          </p>
          <p className="text-lg md:text-xl font-normal font-segoe text-[#ac25eb] mt-0 mb-0">
            {costumes.length}+ kostum tersedia untukmu
          </p>

          {/* start of search */}
          <div
            className="flex items-center w-4/5 md:w-3/5 bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md"
            style={{ marginTop: 30, padding: 0 }}
          >
            <div className="SearchButton">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ba9834d873f505839e8f772bf334e9ad5bf65f78aaa81eedf97a7ddfa72af5c?apiKey=8483ae683318450a8a990dafc43c1ead&"
                alt="search-icon"
                className="search-icon ml-[5px] md:ml-6"
              />
            </div>
            <input
              type="text"
              className="search-input text-lg font-normal font-segoe text-[#252b36] mt-0 mb-0"
              name="string"
              placeholder="Cari kreator atau produk"
              onKeyDown={handleSubmit}
              onChange={handleChange}
            />

            <button type="button" className="search-button" />
          </div>

          <div className="md:flex md:flex-row md:max-w-[60%] justify-between grid grid-cols-2">
            {/* search provinsi */}
            <div className="flex justify-center">
              <div className="mt-5 mx-0 flex flex-row border border-[#0000003d] rounded-[16px] w-[93%]">
                <div className="mt-0 p-0 flex items-center w-[85%] bg-white rounded-[16px] overflow-hidden border-0">
                  <div className="SearchButton" />
                  <input
                    type="text"
                    name="province"
                    className="search-input text-lg font-normal font-segoe text-[#252b36] mt-0 mb-0 ml-2.5"
                    placeholder="Semua Provinsi"
                    onKeyDown={handleSubmit}
                    onChange={handleChange}
                  />
                  <button type="button" className="search-button" />
                </div>
              </div>
            </div>

            {/* search kota */}
            <div>
              <div className="flex justify-center">
                <div className="mt-5 mx-0 flex flex-row border border-[#0000003d] rounded-[16px] w-[93%]">
                  <div className="mt-0 p-0 flex items-center w-[85%] bg-white rounded-[16px] overflow-hidden border-0">
                    <div className="SearchButton" />
                    <input
                      type="text"
                      name="city"
                      className="search-input text-lg font-normal font-segoe text-[#252b36] mt-0 mb-0 ml-2.5"
                      placeholder="Semua Kota"
                      onKeyDown={handleSubmit}
                      onChange={handleChange}
                    />
                    <button type="button" className="search-button" />
                  </div>
                </div>
              </div>
            </div>

            {/* search ukuran */}
            <div>
              <div className="flex justify-center">
                <div className="mt-5 mx-0 flex flex-row border border-[#0000003d] rounded-[16px] w-[93%]">
                  <div className="mt-0 p-0 flex items-center w-[85%] bg-white rounded-[16px] overflow-hidden border-0">
                    <div className="SearchButton" />
                    <input
                      type="text"
                      name="size"
                      className="search-input text-lg font-normal font-segoe text-[#252b36] mt-0 mb-0 ml-2.5"
                      placeholder="Semua Ukuran"
                      onKeyDown={handleSubmit}
                      onChange={handleChange}
                    />
                    <button type="button" className="search-button" />
                  </div>
                </div>
              </div>
            </div>

            {/* search gender */}
            <div>
              <div className="flex justify-center">
                <div className="mt-5 mx-0 flex flex-row border border-[#0000003d] rounded-[16px] w-[93%]">
                  <div className="mt-0 p-0 flex items-center w-[85%] bg-white rounded-[16px] overflow-hidden border-0">
                    <div className="SearchButton" />
                    <input
                      type="text"
                      name="gender"
                      className="search-input text-lg font-normal font-segoe text-[#252b36] mt-0 mb-0 ml-2.5"
                      placeholder="Semua Gender"
                      onKeyDown={handleSubmit}
                      onChange={handleChange}
                    />
                    <button type="button" className="search-button" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ini div tutup buat row search */}

          {/* Fresh from oven */}
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n        .shadow-top {\n          display: flex;\n          margin-top: 10%;\n          min-width: 100%;\n          box-shadow: 0px -50px 60px rgba(0, 0, 0, 0.205);\n        }\n      ",
            }}
          />
          <div className="shadow-top flex flex-col justify-center mt-10 mb-0">
            {/* Title and tombol selengkapnya */}
            <div className="flex flex-row max-w-full justify-between md:px-[10%] pt-0 pb-0 font-sans items-center md:mb-[20px] md:mt-[3%] mx-[5%] my-10">
              <p className="text-[25px] font-normal text-[#3399ff]">
                Fresh From The Oven
              </p>

              <button
                className="bg-[#44444400] text-[#9da5b1] border border-[#9da5b1] cursor-pointer rounded-[6.5px] h-10 w-32 font-normal text-lg"
                onClick={() => router.push("/cari_costum")}
              >
                Selengkapnya
              </button>
            </div>
            {/* the end of fresh from oven + Button row */}
            {/* start of costume for rent */}
            <div className="flex flex-col">
              {/* copy form here */}
              <div className="flex flex-row max-w-full justify-center ">
                <div
                  id="template-container2"
                  className="grid grid-cols-5 max-md:grid-cols-2 max-md:mx-1 max-md:gap-3 gap-4 max-w-full justify-center"
                >
                  {/* Card 1 */}
                  {costumes.map((data) => (
                    <CostumeCard key={data.costumeId} costumeData={data} />
                  ))}
                </div>
              </div>
              {/* to here */}
              {/* end of costumes to rent pt 1 */}
              {/* start of row list rentalan and button Selengkapnya */}
              <div className="max-md:mb-5 mt-10 md:mt-[5%] flex items-center justify-between md:justify-start mx-[5%] md:mx-[15%]">
                <p className="text-[18px] md:text-[25px] font-normal text-[#3399ff]">
                  List Rentalan
                </p>
                <button
                  className="bg-[#44444400] text-[#9da5b1] border border-[#9da5b1] cursor-pointer rounded-[6.5px] h-10 w-32 font-normal text-[17px] md:ml-auto"
                  onClick={() => router.push("/cari_costum")}
                >
                  Selengkapnya
                </button>
              </div>
              {/* end of row list rentalan and button Selengkapnya */}
              {/* start of vendor row 2 */}
              <div className="flex flex-row max-w-full justify-center mt-[2%] mb-[2%]">
                <div
                  id="template-container2"
                  className="grid grid-cols-5 max-md:grid-cols-2 max-md:mx-1 max-md:gap-3 gap-4 max-w-full justify-center"
                >
                  {/* Rental Card */}
                  {rentals.map((data) => (
                    <RentalCard key={data.vendorId} data={data} />
                  ))}
                </div>
              </div>
              {/* end of vendor row 2 */}
            </div>
          </div>
        </div>

        <p style={{ marginTop: "10%" }} />
        {/* start of promosi */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "90%" }}
          >
            <div className="flex justify-center items-center w-full h-[300px] bg-[#252b3650] bg-[url('https://via.placeholder.com/300')] text-black rounded-[10px] my-[10px]">
              {" "}
              advertisments{" "}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full mb-[10%]">
          <div className="flex justify-center w-[90%] gap-0">
            <div className="flex justify-center items-center w-full h-[300px] bg-cover bg-[url('https://via.placeholder.com/300')] text-black m-[10px] rounded-[10px]"> advertisments</div>
            <div className="flex justify-center items-center w-full h-[300px] bg-[#252b3650] bg-cover bg-[url('https://via.placeholder.com/300')] text-black m-[10px] rounded-[10px]"> advertisments</div>
            <div className="flex justify-center items-center w-full h-[300px] bg-[#252b3650] bg-cover bg-[url('https://via.placeholder.com/300')] text-black m-[10px] rounded-[10px]"> advertisments</div>
          </div>
        </div>

        <script
          async="async"
          data-cfasync="false"
          src="//pl23751549.highrevenuenetwork.com/a2f17022dad75dbbfca299c1b9f0e503/invoke.js"
        ></script>
        <div id="container-a2f17022dad75dbbfca299c1b9f0e503"></div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7929228237702491"
     crossorigin="anonymous"></script>
<!-- square ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7929228237702491"
     data-ad-slot="5720561813"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`,
          }}
        ></div>
        {/* end of promosi */}
        {/* start of kostum berdasarkan series */}

        <div className="mt-[5%] flex items-center justify-between md:justify-start mx-[5%] md:mx-[15%]">
          <p className="text-[18px] md:text-[25px] font-normal text-[#3399ff]">
            Kostum berdasarkan Series
          </p>
          <button
            className="bg-[#44444400] text-[#9da5b1] border border-[#9da5b1] cursor-pointer rounded-[6.5px] h-10 w-32 font-normal text-[17px] md:ml-auto"
            onClick={() => router.push("/cari_costum")}
          >
            Selengkapnya
          </button>
        </div>

        {/* start of anime titles */}
        <div className="flex justify-center w-full mt-5 items-center">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="anime-title-button">
                <button onClick={() => (window.location.href = "")}>
                  Bungou Stray Dogs
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full mt-2 items-center">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-[10%] md:mb-[0px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="anime-title-button">
                <button onClick={() => (window.location.href = "")}>
                  Bungou Stray Dogs
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* end of anime titles */}

        {/* start of anime title (1 anime) */}
        <div className="mt-[5%] max-md:mb-[5%] flex items-center justify-between md:justify-start mx-[5%] md:mb-[20px] md:mx-[15%]">
          <p className="text-[18px] md:text-[25px] font-normal text-[#3399ff]">
            Blue Lock
          </p>
          <button
            className="bg-[#44444400] text-[#9da5b1] border border-[#9da5b1] cursor-pointer rounded-[6.5px] h-10 w-32 font-normal text-[17px] md:ml-auto"
            onClick={() => router.push("/cari_costum")}
          >
            Selengkapnya
          </button>
        </div>
        {/* end of anime title (1 anime) */}
        {/* start of costume for rent */}
        {/* copy form here */}
        <div className="flex flex-row max-w-full justify-center ">
          <div
            id="template-container2"
            className="grid grid-cols-5 max-md:grid-cols-2 max-md:mx-1 max-md:gap-3 gap-4 max-w-full justify-center"
          >
            {/* Card 1 */}
            {costumes.map((data) => (
              <CostumeCard key={data.id} costumeData={data} />
            ))}
          </div>
        </div>
        {/* to here */}

        {/* end of costume for rent */}
        {/* start of anime title (1 anime) */}
        <div className="mt-[5%] max-md:mb-[5%] max-md:mt-[20%] flex items-center justify-between md:justify-start mx-[5%] md:mb-[20px] md:mx-[15%]">
          <p className="text-[18px] md:text-[25px] font-normal text-[#3399ff]">
            Genshin Impact
          </p>
          <button
            className="bg-[#44444400] text-[#9da5b1] border border-[#9da5b1] cursor-pointer rounded-[6.5px] h-10 w-32 font-normal text-[17px] md:ml-auto"
            onClick={() => router.push("/cari_costum")}
          >
            Selengkapnya
          </button>
        </div>
        {/* end of anime title (1 anime) */}
        {/* start of costume for rent */}
        {/* copy form here */}
        <div className="flex flex-row max-w-full justify-center ">
          <div
            id="template-container2"
            className="grid grid-cols-5 max-md:grid-cols-2 max-md:mx-1 max-md:gap-3 gap-4 max-w-full justify-center"
          >
            {/* Card 1 */}
            {costumes.map((data) => (
              <CostumeCard key={data.id} costumeData={data} />
            ))}
          </div>
        </div>
        {/* to here */}
        {/* end of costume for rent */}
        <div style={{ margin: "10%" }} />
      </div>
    </>
  );
}

export default App;
