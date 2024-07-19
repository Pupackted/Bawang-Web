"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileCard from "./profilecard";
import VendorEditProfile from "./vendoreditprofile";
import UserEditProfile from "./usereditprofile";
import Link from "next/link";

export default function Profile({ params }) {
  const userId = params.id;
  const router = useRouter();
  const { userData } = useAuthContext();

  const [user, setUser] = useState();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/user?uid=${userId}`);
      const json = await res.json();
      if (res.status === 200) {
        setUser(json);
        if (userData && json.userId == userData.userId) {
          setOwner(true);
        }
      } else {
        console.log(json);
      }
    };

    getData();
  }, []);

  return (
    <div className="grid md:grid-cols-12 mx-2 md:mx-20 my-10 gap-4 font-segoe-ui">
      <div className="flex flex-col col-span-3 space-y-5 ">
        {/* Profile Image & Name */}
        <ProfileCard data={user} owner={owner} />
        <>
        <button className="py-1 px-4 text-left w-1/2 cursor-pointer focus:outline-none hover:bg-gray-200 text-[#AC25EB] font-segoe-ui rounded">
  Wish List
</button>


          {user && user.role === "vendor" && (
          <Link
          href={`/costumes/${user.vendor.vendorId}`}
          className="py-1 px-4 text-left w-1/2 cursor-pointer focus:outline-none hover:bg-gray-200 text-[#AC25EB] font-segoe-ui rounded"
        >
          Costume List
        </Link>
        
          )}
        </>
      </div>
      {user &&
        (user.role === "customer" ? (
          <UserEditProfile userData={user} />
        ) : (
          <VendorEditProfile vendorData={user.vendor} owner={owner} />
        ))}
    </div>
  );
}
