"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils/apiClient";
import logo from "@/assets/Image17.png";
import libraryimg from "@/assets/libraryimg.png";

const Page = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient("/category", {
          method: "GET",
        });
        setCategories(response);
      } catch (err) {
        setError(err.response?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleBrowse = (category) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCategory", JSON.stringify(category));
      router.push(`/view-library/books?categoryId=${category.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-blue-1 via-custom-blue-2 to-custom-blue-3 pt-4 text-white">
      {/* Header */}
      <div className="w-[100%] h-[150px] flex flex-col items-center justify-center p-4">
        <div className="w-[100%] h-[100px] flex items-center justify-between p-4">
          <div>
            <h4 className="text-[20px] font-bold">
              Hello <span className="text-[#b1afff]">Akinfolarin</span>,
            </h4>
            <p className="text-[#fff] text-[9px] font-medium">
              Welcome to the Library, you have been missed!
            </p>
          </div>
          <div
            className="flex items-center"
            onClick={() => router.push("/profile")}
          >
            <Image alt="logo" src={logo} width={35} height={35} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md bg-white rounded-t-[30px] shadow-lg p-6">
        {/* Search Bar */}
        <form>
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0">
            <label className="block text-[#383838] opacity-50 text-[8px] italic font-semibold mb-[-10px] mt-2.5">
              SEARCH FOR A TITLE OR AUTHOR
            </label>
            <input
              type="text"
              className="w-full focus:outline-none text-[#383838] rounded-[15px] p-2"
            />
          </div>
        </form>

        {/* Browse Sections */}
        <div className="py-3 border-y border-[#5D5ADB] mt-8 mb-8">
          <h5 className="text-[#383838] text-2.5 font-semibold">
            Browse Sections
          </h5>
        </div>

        <h5 className="text-[#383838] text-2.5 font-semibold mb-2.5">
          FEATURED COLLECTION
        </h5>
        <Image alt="logo" src={libraryimg} width={300} height={111} />

        {/* Display Categories */}
        <div className="mt-4">
          {loading && <p className="text-[#383838]">Loading categories...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            !error &&
            categories.map((category) => (
              <div
                key={category.id}
                className="border-b border-[#626262] py-3 flex items-center justify-between"
              >
                <p className="text-[#383838] text-[10px] font-semibold">
                  {category.name}
                </p>
                <button
                  onClick={() => handleBrowse(category)}
                  className="bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] text-white py-1.5 px-3 rounded-[6px] text-[6px] font-medium"
                >
                  Browse
                </button>
              </div>
            ))}
        </div>

        {/* Back Button */}
        <button
          className="bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium w-full mt-4"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Page;
