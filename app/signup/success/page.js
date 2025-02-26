"use client";

import Image from "next/image";
import React from "react";
import logo from "@/assets/image3.png";
import adobe from "@/assets/adobe.png";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-blue-1 via-custom-blue-2 to-custom-blue-3 pt-4 text-white">
      {/* Top Navigation Section */}
      <div className="w-full m-auto h-[100px] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-white">UI-ILS</h2>
      </div>

      <div className="w-full max-w-md bg-white rounded-t-[30px] shadow-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <Image alt="logo" src={logo} width={42} height={74} />
        </div>
        <h3 className="text-[25px] font-bold text-[#383838] mb-0 text-center leading-[25px]">
          Please check your Student Email to verify your account
        </h3>
        <div className="flex items-center justify-center">
          <Image alt="success" src={adobe} width={400} height={300} />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium hover:bg-gray-600 transition w-full"
          onClick={() => router.push("/login")}
        >
          Login to my UI-ILS
        </button>
      </div>
    </div>
  );
};

export default Page;
