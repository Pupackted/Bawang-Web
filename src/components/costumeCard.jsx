"use client";
import Link from "next/link";
import React from "react";
import "@/app/App.css";

export default function CostumeCard({ costumeData }) {
  return (
    <Link
      className="item-link"
      href={`/product/${costumeData.costumeId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div class="flex flex-col relative border border-gray-400 rounded-[10px] h-[500px] max-w-[200px]">
          <img
            class="h-[200px] w-[200px] rounded-tl-[10px] rounded-tr-[10px]"
            loading="lazy"
            src={costumeData.image}
          />

          <div class="flex flex-col w-full h-[60.23140496%]">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                class="w-[34px] h-[34px] rounded-[680px] mt-[15px] ml-[10px]"
                loading="lazy"
                src={costumeData.vendor.user.image}
              />

              <div
                class="flex flex-col ml-[4%] mt-[2%]"
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              >
                <p className="profile-name">{costumeData.vendor.displayname}</p>
                <p className="profile-username">{costumeData.vendor.igName}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="item-title">{costumeData.title}</p>
              <p className="item-price">{costumeData.price}</p>
              <div class="flex flex-row ml-[10px] mt-[5px]">
                <img
                  className="tag-image"
                  alt="tag"
                  src="/asset/images/tag.png"
                />
                <p className="item-tag">{costumeData.tag}</p>
              </div>
              <div class="flex flex-row ml-[10px] mt-[5px]">
                <img className="tv-image" alt="tv" src="/asset/images/tv.png" />
                <p className="item-tv">{costumeData.sauce}</p>
              </div>
              <div class="flex flex-row ml-[10px] mt-[5px]">
                <img
                  className="contact-image"
                  alt="contact"
                  src="/asset/images/contact.png"
                />
                <p className="item-contact">{costumeData.vendor.contact}</p>
              </div>
              <div class="flex flex-row ml-[10px] mt-[5px]">
                <div
                  style={{
                    border: "1px solid #252b36",
                    borderRadius: 5,
                  }}
                >
                  <p className="item-size">{"Size: " + costumeData.size}</p>
                </div>
                <div
                  style={{
                    border: "1px solid #252b36",
                    borderRadius: 5,
                    marginLeft: 10,
                  }}
                >
                  <p className="item-gender">{costumeData.gender}</p>
                </div>
              </div>
              <div className="top-border">
                <div class="flex flex-row ml-[10px] mt-[5%] mb-[5%] overflow-hidden">
                  <img
                    className="location-image aspect-square object-contain"
                    alt="location"
                    src="/asset/images/location.png"
                  />
                  <p className="item-location">{`${costumeData.vendor.city}, ${costumeData.vendor.province}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
