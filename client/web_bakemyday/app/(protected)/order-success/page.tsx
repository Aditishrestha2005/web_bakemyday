"use client";

import Link from "next/link";
import Navbar from "../../(public)/_components/Navbar";
import Footer from "../../(public)/_components/Footer";

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8F5F1] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 max-w-md w-full space-y-6">
          {/* Celebration Animation */}
          <div className="text-6xl animate-bounce">🎉</div>

          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold text-[#3A291D]">
              Order Placed Successfully
            </h1>
            <p className="text-gray-500 font-medium">
              Thank you for ordering from BakeMyDay!
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Action Button */}
          <div>
            <Link
              href="/menu"
              className="inline-block w-full bg-[#C1B599] text-[#4A3B32] font-serif font-bold text-lg py-3 rounded shadow-sm hover:bg-[#b0a385] transition-all"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}