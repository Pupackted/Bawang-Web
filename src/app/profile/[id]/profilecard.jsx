import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "@/backend/firebase/uploadImage.js";

export default function ProfileCard({ data, owner }) {
  const [image, setImage] = useState();

  useEffect(() => {
    if (data) {
      setImage(data.image);
    }
  }, [data]);

  async function uploadProfile(e) {
    if (e.target?.files[0]) {
      const image = e.target.files[0];

      const imageUrl = await uploadImage(
        `users/${data.userId}/${image.name}`,
        image
      );

      const update = await fetch(`/api/upload-image/${data.userId}`, {
        method: "POST",
        body: JSON.stringify({ image: imageUrl }),
      });
      if (update.status === 200) {
        console.log(await update.json())
        toast.success("Update Success", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
        setImage(imageUrl)
      } else {
        toast.error("Update Failed, Try again", {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
  }

  if (!data)
    return (
      <div className="flex border border-gray-400 rounded-[10px] p-4 gap-4 animate-pulse">
        <div className="size-20 rounded-full bg-slate-400"></div>
        <div className="flex flex-col justify-between flex-grow my-1">
          <div className="w-4/6 h-3 rounded-full bg-slate-400"></div>
          <div className="bg-slate-400 w-5/6 h-3 rounded-full"></div>
          <div className="bg-slate-400 w-40 h-3 rounded-full"></div>
        </div>
      </div>
    );

  return (
    <div className="border border-gray-400 rounded-[10px] p-4 gap-4 flex flex-col md:flex-col lg:flex-col xl:flex-row">
      <div>
        {/* TODO: image resizing and shit */}
        <div className="aspect-square w-20 rounded-full relative">
          <input
            type="file"
            accept="image/*"
            className="file:opacity-0 file:absolute file:inset-0 opacity-0 absolute inset-0 z-20"
            onChange={uploadProfile}
            disabled={!owner}
          />
          {owner && (
            <div className="w-6 h-6 bottom-0 right-0 bg-slate-300 absolute p-1.5 rounded-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png"
                alt=""
              />
            </div>
          )}
          <img
            src={
              image ??
              "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
            }
            alt="profile"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col break-words w-full">
          <h6 className="font-bold truncate">{data.username}</h6>
          <p className="truncate">{data.email}</p>
          <p className="truncate">{data.role}</p>
        </div>
      </div>
    </div>
  );
}
