"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setError("");

    try {
      setLoading(true);

     const response = await fetch(
  "http://localhost:5000/api/auth/login",
  {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);

      const data = await response.json();

      if (response.ok) {
        alert("passed");

        
        localStorage.setItem("token", data.token);

        
        localStorage.setItem(
          "user",
          JSON.stringify(data.data)
        );

        
        router.push("/menu");
      } else {
       setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
    setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

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

      <div className="bg-[#F4EFEF] flex items-center justify-center">

        <div className="w-full max-w-[420px]">

          <h1 className="font-serif text-[42px] font-bold text-[#3A291D] text-center mb-12">
            Welcome Back
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

           
            <div>
              <label className="block text-[#3A291D] font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm bg-white outline-none text-[#3A291D]"
                required
              />
            </div>

            <div>
              <label className="block text-[#3A291D] font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-[#8A817C] px-3 py-2 rounded-sm bg-white outline-none text-[#3A291D]"
                required
              />
            </div>
            {error && (
  <p className="text-red-600 text-sm font-medium -mt-3">
    {error}
  </p>
)}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B6AF8C] text-[#3A291D] py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>

          </form>

          <p className="text-center mt-6 text-[#3A291D]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}