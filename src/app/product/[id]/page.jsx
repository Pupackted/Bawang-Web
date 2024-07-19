"use client";

import React, { useEffect, useState } from "react";
import "./productstyles.css";
import getDocument from "@/backend/firebase/getData";
import CostumeCard from "@/components/costumeCard";
import getCollection from "@/backend/firebase/getCollection";

export default function Product({ params }) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const id = decodeURIComponent(params.id);

  const [costume, setCostume] = useState({
    costumeId: 5,
    title: "Asuna Cosplay Lmao",
    image:
      "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2F7f9c45593cf4f90d8ad7be7e31231e5edda09606.jpg?alt=media&token=e965b753-442a-4044-bb7a-8dfcead5079c",
    price: "100k / 3 days",
    tag: "Maker Lokal",
    sauce: "Blue Archive",
    size: "M",
    gender: "Female",
    details: "waow",
    rules: "waow",
    disclaimer: "waow",
    VendorId: 1,
    costumeImages: [
      {
        imageUrl: "waow",
        costumeId: 5,
      },
      {
        imageUrl: "waow 2",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2F65aa9c80c0cc7409f2bf9861dda1a7ce0c742b33.jpg?alt=media&token=0b9c2d7d-01c3-4971-97bf-5594fe3731a5",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2F4e6f1ddc93febdac51223678fa6e31d12e5337ff.jpg?alt=media&token=486cc881-1994-4a63-9c33-e9d4457cb1c7",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2F65aa9c80c0cc7409f2bf9861dda1a7ce0c742b33.jpg?alt=media&token=262eace6-a9be-4bf9-928b-4b935120e0e2",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2F4e6f1ddc93febdac51223678fa6e31d12e5337ff.jpg?alt=media&token=f5b413e6-98a1-414b-89a2-269585cece40",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2Fad8b504259e0fa2a1aafec0c0d62beade9c32538.jpg?alt=media&token=6af3195e-00bd-4348-842a-3ed1030a08cc",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2F65aa9c80c0cc7409f2bf9861dda1a7ce0c742b33.jpg?alt=media&token=9897111e-4094-4da4-92a7-d3f3c5dfa55e",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2F4e6f1ddc93febdac51223678fa6e31d12e5337ff.jpg?alt=media&token=4ffbbe0b-d17a-4245-a2da-841b9b2fe078",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2Fad8b504259e0fa2a1aafec0c0d62beade9c32538.jpg?alt=media&token=e38ca9c0-c9a5-460d-a634-d3b09dc0f8c8",
        costumeId: 5,
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/bawang-2.appspot.com/o/costumes%2F5%2FadditionImages%2FWhatsApp%20Image%202024-06-24%20at%2012.51.01_addd6284.jpg?alt=media&token=cf3fd051-a66c-4586-b800-d3b56a3ad86c",
        costumeId: 5,
      },
    ],
    vendor: {
      displayname: "Gigachad Cosrent",
      igName: "@sigma.male",
      province: "Banten",
      city: "BSD",
      contact: "maxwin",
    },
  });

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/costume/${id}`);
      const json = await res.json();
      if (res.status === 200) {
        console.log(json);
        setCostume(json);
      } else {
        console.log(json);
      }
    };

    getData();
  }, []);

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

  const [image, setImage] = useState("");

  useEffect(() => {
    if (Object.hasOwnProperty.call(costume, "image")) {
      setImage(costume.image);
    }
  }, [costume]);

  function changeImage(img) {
    setImage(img.imageUrl);
    console.log(img);
  }

  if (!Object.hasOwnProperty.call(costume, "costumeImages")) {
    return <div className="h-screen w-full"></div>;
  } else {
    return (
      <>
        <div>
          <div>
            {/* start of main row */}
            <div className="flex flex-col md:flex-row mx-[5%] mt-[2%]">
              {/* start of search */}
              <div className="flex md:hidden items-center bg-white rounded-md overflow-hidden border border-gray-300 shadow-md ml-[0%] mb-[20px] w-[98%]">
                <input
                  type="text"
                  className="border-none outline-none p-2 text-[16px] w-full bg-transparent"
                  placeholder="Cari kreator atau produk"
                />
                <div className="SearchButton">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ba9834d873f505839e8f772bf334e9ad5bf65f78aaa81eedf97a7ddfa72af5c?apiKey=8483ae683318450a8a990dafc43c1ead&"
                    alt=""
                    className="search-icon mr-5"
                  />
                </div>
              </div>
              {/* end of search */}

              {/* start of left image */}
              {/* main image */}
              <div className="image-container">
                <img
                  id="big-image"
                  className="big-image"
                  src={image}
                  alt="Main Product"
                />
                {/* thumbmail image */}
                <div className="thumbnail-container">
                  {costume.costumeImages.map((img, idx) => {
                    return (
                      <img
                        key={img}
                        className="thumbnail"
                        src={img.imageUrl}
                        alt=""
                        onClick={() => changeImage(img)}
                      />
                    );
                  })}
                </div>
              </div>
              {/* end of left image */}
              {/* start of column  */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "100%",
                  alignItems: "start",
                }}
              >
                {/* start of search */}
                <div className="hidden md:flex items-center bg-white rounded-md overflow-hidden border border-gray-300 shadow-md ml-[5%] w-[95%]">
                  <input
                    type="text"
                    className="border-none outline-none p-2 text-[16px] w-full bg-transparent"
                    placeholder="Cari kreator atau produk"
                  />
                  <div className="SearchButton">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ba9834d873f505839e8f772bf334e9ad5bf65f78aaa81eedf97a7ddfa72af5c?apiKey=8483ae683318450a8a990dafc43c1ead&"
                      alt=""
                      className="search-icon mr-5"
                    />
                  </div>
                </div>
                {/* end of search */}

                {/* start of inner row */}
                <div className="flex flex-row md:w-[95%] md:ml-[5%]">
                  <div className="flex flex-col items-start md:w-[80%]">
                    <div className="flex flex-col">
                      <div className="flex flex-col w-full h-[60.23140496%]">
                        <div className="flex flex-col mt-[3%]">
                          <div className="flex">
                            <p className="item-title1">{costume.title}</p>
                            <button
                              className={`w-10 h-10 mt-[10px] ml-[5px] focus:outline-none ${
                                isLiked ? "text-red-500" : "text-gray-500"
                              }`}
                              onClick={toggleLike}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`w-6 h-6 transition-transform duration-200 ${
                                  isLiked ? "scale-125" : ""
                                }`}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <p className="item-price1">{costume.price}</p>
                          <div className="flex flex-row mt-[3%]">
                            <img
                              className="location-image1 h-[20px] w-[20px]"
                              src="../../asset/images/location.png"
                              alt="location"
                            />
                            <p className="item-location1">{`${costume.vendor.city}, ${costume.vendor.province}`}</p>
                          </div>

                          <div className="flex flex-row ml-0 mt-[3%]">
                            <img
                              className="tag-image1 h-[20px] w-[20px]"
                              src="../../asset/images/tag.png"
                              alt="tag"
                            />
                            <p className="item-tag1">{costume.tag}</p>
                          </div>
                          <div className="flex flex-row ml-0 mt-[3%]">
                            <img
                              className="tv-image1 h-[20px] w-[20px]"
                              src="../../asset/images/tv.png"
                              alt="tv"
                            />
                            <p className="item-tv1">{costume.sauce}</p>
                          </div>
                          <div className="flex flex-row ml-0 mt-[3%]">
                            <img
                              className="contact-image1 h-[20px] w-[20px]"
                              src="../../asset/images/contact.png"
                              alt="contact"
                            />
                            <p className="item-contact1">
                              {costume.vendor.contact}
                            </p>
                          </div>
                          <div className="flex flex-row ml-0 mt-[5%]">
                            <div className="border border-[#252b36] rounded-[5px]">
                              <p className="item-size1">
                                Size: {`${costume.size}`}
                              </p>
                            </div>
                            <div className="border border-[#252b36] rounded-[5px] ml-[10px]">
                              <p className="item-gender1">{costume.gender}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* h-[230px] */}
                    {/* Box yang di kanan */}
                    <div className="flex md:hidden border border-[#080a0c34] max-h-[500px] mr-0 mt-[3%] bg-white rounded-[6px] box-border w-4/5 self-center">
                      <div className="flex flex-col box-border w-full">
                        <div className="flex flex-row">
                          <img
                            className="w-[34px] h-[34px] rounded-full mt-[15px] ml-[10px]"
                            loading="lazy"
                            src="https://dotesports.com/wp-content/uploads/2022/11/21122158/Character-Demo-Yae-Miko-Anecdote-of-a-Divine-Kitsune-Guuji-Genshin-Impact_-Character-Demo-Yae-Miko-Anecdote-of-a-Divine-Kitsune-Guuji-Genshin-Impact-2022-11-18-102128.979-1080p-streamshot.png"
                          />
                          <div className="flex flex-col ml-[4%] max-w-full font-segoe">
                            <p className="font-bold text-[#ac25eb] text-[13.6px] mb-0 mt-[15px] mr-[10px]">
                              Adrian
                            </p>
                            <p className="text-[#252b36] text-[13.6px] mt-0">
                              @adrian_racman
                            </p>
                            <div id="Box-Kanan" className="description-box" />
                          </div>
                        </div>

                        <div className=" mt-[15%] border-t border-[#252b363b] max-h-[100%] overflow-hidden flex justify-center bg-[#252b3602]">
                          {/* <div className="flex items-center justify-center mt-[20%] border-t border-[#252b363b] max-h-[100%] overflow-hidden bg-[#252b3602] w-full"> */}
                          <a
                            href={costume.vendor.igName}
                            target="_blank"
                            className="py-4 my-4 px-12 rounded-lg bg-[#ffc600] text-black text-base font-bold cursor-pointer hover:bg-[#555]"
                          >
                            <button>DM Instagram</button>
                          </a>
                        </div>
                        {/* Diluar inner column */}
                      </div>
                    </div>
                    {/* end of box yg di kanan itu */}
                    <p className="text-[25px] font-normal font-segoe text-[#3399ff] mb-0 ml-0 mt-[7%] mb-[5%] mr-[5px] items-start">
                      Detail
                    </p>
                    <p
                      id="description-box"
                      className="font-segoe text-[#252b36e8] md:mr-[20px] break-words text-justify whitespace-pre"
                      dangerouslySetInnerHTML={{
                        __html: costume.details.replace(
                          /(?:\r\n|\r|\n)/g,
                          "<br>"
                        ),
                      }}
                    ></p>
                    {/* instagram button */}
                    <a
                      href={costume.vendor.igName}
                      className="w-[187px] h-[40px] bg-transparent border-2 border-[#ac25eb] rounded-md text-[#ac25eb] font-sans text-base text-center leading-[36px] cursor-pointer no-underline inline-block mt-[7%] hover:bg-[##ac25eb] "
                      target="_blank"
                    >
                      Lihat di Instagram
                    </a>
                    {/* end of instagram button  */}
                    {/* aturan sewa and disclaimer */}
                    <p className="text-[25px] font-normal font-segoe text-[#3399ff] mb-0 ml-0 mt-[7%] mb-[5%] mr-[5px] items-start">
                      Aturan Sewa
                    </p>
                    <div
                      id="description-box2"
                      className="font-segoe text-[#252b36e8] md:mr-[20px] break-words"
                      dangerouslySetInnerHTML={{
                        __html: costume.rules.replace(
                          /(?:\r\n|\r|\n)/g,
                          "<br>"
                        ),
                      }}
                    ></div>
                    <p className="text-[25px] font-normal font-segoe text-[#3399ff] mb-0 ml-0 mt-[7%] mb-[5%] mr-[5px] items-start">
                      Disclaimer
                    </p>
                    <div
                      id="Disclaimer-box"
                      className="font-segoe text-[#252b36e8] md:mr-[20px] break-words mb-[10%] md:mb-[2%]"
                      dangerouslySetInnerHTML={{
                        __html: costume.disclaimer.replace(
                          /(?:\r\n|\r|\n)/g,
                          "<br>"
                        ),
                      }}
                    ></div>
                    {/* end of aturan sewa and disclaimer */}
                  </div>
                  {/* box yang di kanan */}
                  <div className="hidden md:flex flex-col border border-[#080a0c34] w-[30%] h-[230px] max-h-[500px] mt-[3%] bg-white rounded-[6px] box-border">
                    <div className="flex flex-col box-border">
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          className="w-[34px] h-[34px] rounded-full mt-[15px] ml-[10px]"
                          loading="lazy"
                          src="https://dotesports.com/wp-content/uploads/2022/11/21122158/Character-Demo-Yae-Miko-Anecdote-of-a-Divine-Kitsune-Guuji-Genshin-Impact_-Character-Demo-Yae-Miko-Anecdote-of-a-Divine-Kitsune-Guuji-Genshin-Impact-2022-11-18-102128.979-1080p-streamshot.png"
                        />
                        <div
                          className="profile-details"
                          style={{
                            fontFamily: "Segoe UI, sans-serif",
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "4%",
                            maxWidth: "100%",
                          }}
                        >
                          <p className="font-sans font-bold text-[13.6px] mb-0 text-[#ac25eb] ml-0 mt-[15px] mr-[10px]">
                            Adrian
                          </p>
                          <p className="font-normal text-[13.6px] mt-0 text-[#252b36]">
                            @adrian_racman
                          </p>
                          <div id="Box-Kanan" className="description-box" />
                        </div>
                      </div>
                      <div
                        className="mt-[25%] border-t border-[#252b363b] max-h-[30%] overflow-hidden bg-[#252b3602] flex items-center justify-center"
                        style={{
                          height: "200px",
                        }}
                      >
                        <a
                          href={costume.vendor.igName}
                          target="_blank"
                          className="py-3 my-4 px-12 rounded-lg bg-[#ffc600] text-black text-base font-bold cursor-pointer hover:bg-[#555] "
                          // style={{
                          //   marginLeft: "25px",
                          // }}
                        >
                          <button
                          // style={{
                          //   marginRight: "20px",
                          // }}
                          >
                            DM Instagram
                          </button>
                        </a>
                      </div>
                      {/* diluar inner column */}
                    </div>
                  </div>
                </div>
                {/* end of box yg di kanan itu */}
              </div>
              {/* end of inner row */}
            </div>
            {/* end of column */}
            {/* end of main row */}
            {/*  */}
            {/*  */}
            {/* start of row list rentalan and button Selengkapnya */}
            {/* Kostum lainnya*/}
            <div className="mt-[5%] flex items-center justify-between md:justify-start mx-[10%] md:mx-[15%] max-md:mb-4">
              <p className="text-[18px] md:text-[25px] font-normal text-[#3399ff]">
                Kostum Lainnya
              </p>
              <button
                className="bg-[#44444400] text-[#9da5b1] border border-[#9da5b1] cursor-pointer rounded-[6.5px] h-10 w-32 font-normal text-[17px] md:ml-auto"
                onClick={() => router.push("/cari_costum")}
              >
                Selengkapnya
              </button>
            </div>
            {/* Kostum Lainnya */}
            {/*  */}
            {/*  */}
            {/* start of costume for rent */}

            {/* copy form here */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                maxWidth: "100%",
                justifyContent: "center",
                marginTop: "2%",
              }}
            >
              <div
                id="template-container2"
                className="grid grid-cols-5 max-md:grid-cols-2 max-md:mx-1 max-md:gap-3 gap-4 max-w-full justify-center"
              >
                {costumes
                  .filter((data) => data.costumeId !== id)
                  .map((data) => (
                    <CostumeCard key={data.costumeId} costumeData={data} />
                  ))}
              </div>
            </div>
            {/* to here */}
            {/* end of costumes to rent pt 1*/}
          </div>
          <div style={{ height: 20 }} />
        </div>
      </>
    );
  }
}
