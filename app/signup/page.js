"use client";

import { useState } from "react";
import facultiesData from "../../utils/faculties.json";
import sessionsData from "../../utils/sessions.json";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
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

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    router.push("/signup/success");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-blue-1 via-custom-blue-2 to-custom-blue-3 pt-4 text-white">
      <div className="w-[100%] m-auto h-[150px] bg-inherit flex flex-col items-center justify-center p-4">
        <div className="w-[100%] m-auto h-[100px] bg-inherit rounded-full flex items-center justify-between p-4">
          <div>{"<"}</div>
          <div>
            <p className="text-[11px]">I already have an account</p>
          </div>
          <div>
            <button
              className="text-[11px] bg-[#726EF8] shadow-[5px_15px_45px_#00000029] rounded-[9px] px-3 py-1"
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white">UI-ILS</h2>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-t-[30px] rounded-b-none shadow-lg p-6">
        <div className="text-center mb-6">
          <p className="text-[#383838] text-[25px] font-bold">
            Your Library Journey Starts Here
          </p>
          <p className="text-[#383838] text-[12px] font-semibold">
            Say Bye to endless KDL registration hassles!
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
        >
          {step === 1 ? (
            <>
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
                  type="number"
                  name="matric"
                  value={form.matric}
                  onChange={handleChange}
                  className="w-full focus:outline-none text-[#383838] rounded-[15px]"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium hover:bg-gray-600 transition w-full"
                onClick={handleNext}
              >
                Next Step
              </button>
            </>
          ) : (
            <>
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
                  type="number"
                  name="matric"
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

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gradient-to-r from-[#070621] to-[#060369] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium hover:bg-gray-600 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium hover:bg-gray-600 transition"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
