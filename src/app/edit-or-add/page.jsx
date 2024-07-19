"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ImagesField from "./imagesfield.tsx";
import { useAuthContext } from "@/context/AuthContext";
import { uploadImage } from "@/backend/firebase/uploadImage.js";
import { toast } from "react-toastify";

export default function EditOrAdd() {
  const qp = useSearchParams();
  const costumeId = qp.get("cid");

  const { userData } = useAuthContext();

  let [costume, setCostume] = useState({ costumeImages: [] });

  let [images, setImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/costume/${costumeId}`, {});
      const json = await res.json();
      if (res.status === 200) {
        setCostume(json);
        setImages(json.costumeImages);
      } else {
      }
    };

    if (costumeId) {
      getData();
    }

    console.log(userData);
  }, []);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setCostume((values) => ({ ...values, [name]: value }));
  }

  function handleFileInput(e) {
    const name = e.target.name;
    const file = e.target.files[0];
    setCostume((values) => ({ ...values, [name]: file }));
  }

  async function handleSubmit(e) {
    e.preventDefault;

    if (!(typeof costume.image === "string")) {
      const image = costume.image;

      const imageUrl = await uploadImage(
        `costumes/${costumeId}/${image.name}`,
        image
      );

      costume = { ...costume, image: imageUrl };
    }

    if (costume.costumeImages) {
      costume.costumeImages = await Promise.all(
        costume.costumeImages.map(async (costumeImage) => {
          if (costumeImage.file && !(typeof costumeImage.file === "string")) {
            const image = costumeImage.file;

            const imageUrl = await uploadImage(
              `costumes/${costumeId}/additionImages/${image.name}`,
              image
            );

            return { ...costumeImage, imageUrl: imageUrl };
          } else {
            return costumeImage;
          }
        })
      );
    }

    costume = { ...costume, vendorId: userData.vendor.vendorId };

    setCostume({ ...costume });

    if (!costumeId) {
      const res = await fetch(`/api/costume/${costumeId}`, {
        method: "POST",
        body: JSON.stringify(costume),
      });
      if (res.status === 200) {
        toast.success("Success", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      } else {
        toast.error("Try again", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      }
    } else {
      const res = await fetch(`/api/costume/${costumeId}`, {
        method: "PATCH",
        body: JSON.stringify(costume),
      });
      if (res.status === 200) {
        toast.success("Update Success", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      } else {
        toast.error("Update Failed, Try again", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
  }

  useEffect(() => {
    console.log(costume);
  }, [costume]);

  return (
    <div className="md:mx-[10%] md:my-[5%] mx-[10%] mb-[5%] mt-[10%]">
      <form action={handleSubmit} encType="multipart/form-data">
        <label
          htmlFor="title"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p className="font-segoe font-normal text-[32px] text-[#252b36] mt-0 md:mb-[70px] mb-[50px]">
            Edit Costume
          </p>
          <p>Costume Title</p>
          <input
            onChange={handleChange}
            value={costume?.title ?? ""}
            type="text"
            name="title"
            id="title"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            required
          />
        </label>
        <label
          htmlFor="price"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Price</p>
          <input
            onChange={handleChange}
            value={costume?.price ?? ""}
            type="text"
            name="price"
            id="price"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            required
          />
        </label>
        <label
          htmlFor="tag"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Tag</p>
          <input
            onChange={handleChange}
            value={costume?.tag ?? ""}
            type="text"
            name="tag"
            id="tag"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            required
          />
        </label>
        <label
          htmlFor="sauce"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Anime/Game source</p>
          <input
            onChange={handleChange}
            value={costume?.sauce ?? ""}
            type="text"
            name="sauce"
            id="sauce"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            required
          />
        </label>
        <label
          htmlFor="size"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Size</p>
          <select
            onChange={handleChange}
            value={costume?.size ?? ""}
            name="size"
            id="size"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base bg-gray-100"
            required
          >
            <option value="" hidden></option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
        <label
          htmlFor="gender"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Gender</p>
          <select
            onChange={handleChange}
            value={costume?.gender ?? ""}
            name="gender"
            id="gender"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base bg-gray-100"
            required
          >
            <option value="" hidden></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label
          htmlFor="details"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Details</p>
          <textarea
            onChange={handleChange}
            value={costume?.details ?? ""}
            rows={5}
            name="details"
            id="details"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            required
          />
        </label>
        <label
          htmlFor="rules"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Rules</p>
          <textarea
            onChange={handleChange}
            value={costume?.rules ?? ""}
            rows={5}
            name="rules"
            id="rules"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            required
          />
        </label>
        <label
          htmlFor="disclaimer"
          className="flex flex-col items-start mb-5 text-base text-gray-800"
        >
          <p>Costume Disclaimer</p>
          <textarea
            onChange={handleChange}
            value={costume?.disclaimer ?? ""}
            rows={5}
            name="disclaimer"
            id="disclaimer"
            placeholder="Jason Bourne Cosplay"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-base disabled:border-0 bg-gray-100"
            required
          />
        </label>
        <label
          htmlFor="image"
          className="flex flex-col items-start mb-[50px] text-base text-gray-800 mt-[50px]"
        >
          <p className="mb-[20px]">Main Costume image</p>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="rounded-xl w-full "
            onChange={handleFileInput}
          />
        </label>

        <ImagesField defaultImages={images ?? []} setCostume={setCostume} />
        <button
          type="submit"
          className="py-2 px-10 text-left text-white bg-purple-600 rounded-lg ml-[10px] mr-[10px] mb-[10px] mt-[20px]"
        >
          Save
        </button>
      </form>
    </div>
  );
}
