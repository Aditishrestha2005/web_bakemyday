"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful 🎉");

        router.push("/login");
      } else {
        alert(data.message || JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* Left Side */}
      <div className="relative">
        <Image
          src="/register-cake.png"
          alt="Cake"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="bg-[#F4EFEF] flex items-center justify-center">

        <div className="w-full max-w-[420px]">

          <h1 className="font-serif text-[42px] font-bold text-[#3A291D] text-center mb-10">
            Create an Account
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Full Name */}
            <div>
              <label className="block text-[#3A291D] font-medium mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm outline-none bg-white text-[#3A291D]"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-[#3A291D] font-medium mb-1">
                User Name
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="User Name"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm outline-none bg-white text-[#3A291D]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#3A291D] font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm outline-none bg-white text-[#3A291D]"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#3A291D] font-medium mb-1">
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm outline-none bg-white text-[#3A291D]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#3A291D] font-medium mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm outline-none bg-white text-[#3A291D]"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#3A291D] font-medium mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm outline-none bg-white text-[#3A291D]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B6AF8C] text-[#3A291D] py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-6 text-[#3A291D]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}