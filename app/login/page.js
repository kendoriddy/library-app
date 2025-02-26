"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils/apiClient";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ matric: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      const payload = {
        studentId: form.matric,
        password: form.password,
      };
      const response = await apiClient("user/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.message);
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-blue-1 via-custom-blue-2 to-custom-blue-3 pt-4 text-white">
      {/* Top Navigation Section */}
      <div className="w-full m-auto h-[150px] flex flex-col items-center justify-center p-4">
        <div className="w-full h-[100px] flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="text-xl">
            {"<"}
          </button>
          <p className="text-[11px]">I have not registered previously?</p>
          <button
            className="text-[11px] bg-[#726EF8] shadow-lg rounded-[9px] px-3 py-1"
            onClick={() => router.push("/signup")}
          >
            Get started
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-white">UI-ILS</h2>
      </div>

      {/* Login Form Section */}
      <div className="w-full max-w-md bg-white rounded-t-[30px] shadow-lg p-6">
        <div className="text-center mb-6">
          <p className="text-[#383838] text-[25px] font-bold">Welcome Back</p>
          <p className="text-[#383838] text-[12px] font-semibold">
            Please enter your log-in details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Matric Number Input */}
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              MATRIC NUMBER
            </label>
            <input
              type="text"
              name="matric"
              value={form.matric}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px] p-2"
              required
            />
          </div>

          {/* Password Input */}
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0.5">
            <label className="block text-[#383838] opacity-50 text-[10px] font-semibold mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px] p-2"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium hover:bg-gray-600 transition w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-[#383838] font-semibold text-xs text-center">
            Forgot your Password?
          </p>
        </form>
      </div>
    </div>
  );
}
