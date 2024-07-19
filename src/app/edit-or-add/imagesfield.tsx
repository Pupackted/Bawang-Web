"use client";
import React, { useEffect, useState } from "react";

export default function ImagesField({
  defaultImages,
  setCostume,
}: {
  defaultImages: any[];
  setCostume: any;
}) {
  const [images, setImages] = useState(
    defaultImages.map((val) => ({
      ...val,
      op: "READ",
    }))
  );

  function handleFileInput(e) {
    const id = parseInt(e.target.name);
    const file = e.target.files[0];

    if (!Number.isNaN(id)) {
      setImages(
        images.map((val, idx) => {
          if (idx === id) {
            return {
              ...val,
              id: id,
              file: file,
            };
          } else {
            return val;
          }
        })
      );
    } else {
      setImages(
        images.map((val, idx) => {
          if (val.imageUrl === e.target.name) {
            return {
              ...val,
              file: file,
              op: "UPDATE",
            };
          } else {
            return val;
          }
        })
      );
    }
  }

  useEffect(() => {
    setImages(
      defaultImages.map((val) => ({
        ...val,
        op: "READ",
      }))
    );
  }, [defaultImages]);

  useEffect(() => {
    setCostume((costume) => ({ ...costume, costumeImages: images }));
  }, [images]);

  return (
    <label
      htmlFor="costumeImage"
      className="flex flex-col items-start mb-5 text-base text-gray-800"
    >
      <link
        rel="stylesheet"
        href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
      />
      <script
        src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"
        async
      ></script>
      <p
        className="underline text-black cursor-pointer mb-[20px]"
        onClick={() =>
          setImages([
            ...images,
            { id: images.length, file: null, op: "CREATE" },
          ])
        }
      >
        Add More Images
      </p>

      {images.filter(val=>!(val.op === "DELETE")).map((image, idx) => (
        <div
          key={idx}
          className="flex md:flex-row flex-col w-full md:items-center items-start justify-start mb-[20px] md:mb-[0px]"
        >
          <input
            type="file"
            name={`${image?.imageUrl ?? idx}`}
            // id="costumeImages"
            accept="image/*"
            className="rounded-xl mb-[10px] md:mb-[10px] w-full border border-gray-400 md:mr-[40px]"
            onChange={handleFileInput}
          />
          {image?.imageUrl && <p className="basis-auto truncate">{image.imageUrl}</p>}

          <button
            type="button"
            className="rounded-[7px] mb-[10px] md:mb-[10px] px-[10px]  bg-red-600 text-white hover:bg-red-800 focus:outline-none"
            onClick={() => {
              if (image?.imageId) {
                setImages(
                  images.map((val) => {
                    if (val.imageId === image.imageId) {
                      return { ...val, op: "DELETE" };
                    }
                    return val;
                  })
                );
              } else {
                setImages(images.filter((val, index) => !(idx === index)));
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </label>
  );
}
