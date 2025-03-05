"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/Image17.png";
import facultiesData from "../../utils/faculties.json";
import sessionsData from "../../utils/sessions.json";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils/apiClient";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    name: "",
    matric: "",
    session: "",
    faculty: "",
    department: "",
    phone: "",
  });

  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [collectionDate, setCollectionDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "faculty") {
      setDepartments(facultiesData[value] || []);
      setForm((prev) => ({ ...prev, department: "" }));
    }
  };

  const handleSchedule = async () => {
    if (!collectionDate) {
      toast.error("Please select a collection date.");
      return;
    }

    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const response = await apiClient("/cardCollection", {
        method: "POST",
        body: JSON.stringify({
          studentId: user.id, // You may replace with actual student ID
          collectionDate: new Date(collectionDate).toISOString(),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Library card collection scheduled successfully!");
        setShowModal(false);
      } else {
        toast.error("Failed to schedule collection. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-blue-1 via-custom-blue-2 to-custom-blue-3 pt-4 text-white">
      {/* Top Navigation Section */}
      <div className="w-full m-auto h-[100px] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-white">MY PROFILE</h2>
      </div>

      <div className="w-full max-w-md bg-white rounded-t-[30px] shadow-lg p-6">
        <div className="flex -mt-11 items-center justify-center mb-4">
          <Image alt="logo" src={logo} width={42} height={74} />
        </div>

        <div className="bg-[#3733CA] rounded-[15px] flex items-center justify-between px-3 mb-3 py-5">
          <div>
            <p className="text-[12px] font-semibold">Collect my Library Card</p>
          </div>
          <div>
            <button
              className="text-[11px] bg-[#726EF8] shadow-[5px_15px_45px_#00000029] rounded-[9px] px-3 py-1"
              onClick={() => setShowModal(true)}
            >
              Schedule
            </button>
          </div>
        </div>

        {/* Schedule Modal */}
        {showModal && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-5 w-80">
              <h3 className="text-black font-semibold mb-3">Select a Date</h3>
              <input
                type="datetime-local"
                className="w-full border p-2 rounded text-black"
                value={collectionDate}
                onChange={(e) => {
                  setCollectionDate(e.target.value);
                }}
              />
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleSchedule}
                >
                  {isLoading ? "Loading..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}

        <form className="space-y-2">
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px]"
            />
          </div>
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px]"
            />
          </div>
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              MATRIC NUMBER
            </label>
            <input
              type="text"
              name="matric"
              value={form.matric}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px]"
            />
          </div>
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              SESSION OF ENTRY
            </label>
            <select
              name="session"
              value={form.session}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px] bg-white text-[13px]"
            >
              <option value="" disabled>
                Select an option
              </option>
              {sessionsData.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

          {/* Faculty */}
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              FACULTY
            </label>
            <select
              name="faculty"
              value={form.faculty}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px] bg-white text-[13px]"
            >
              <option value="" disabled>
                Select Faculty
              </option>
              {Object.keys(facultiesData).map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              DEPARTMENT
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px] bg-white text-[13px]"
              disabled={!departments.length}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              PHONE NUMBER
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px]"
            />
          </div>

          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-2">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              UPLOAD PASSPORT PHOTOGRAPH
            </label>
            <input
              type="file"
              name="passport"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setForm((prev) => ({ ...prev, passport: file }));
              }}
              className="w-full focus:outline-none text-[#383838] rounded-[0px] bg-white text-[13px]"
            />
          </div>
        </form>

        <button
          className="bg-gradient-to-r from-[#0D0C34] to-[#1e1e2f] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium hover:bg-gray-600 transition w-full mt-4"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Page;
