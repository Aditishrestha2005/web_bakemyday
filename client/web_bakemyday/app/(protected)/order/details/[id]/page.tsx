"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../(public)/_components/Navbar";
import Footer from "../../../../(public)/_components/Footer";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/${id}`);
      const data = await response.json();

      if (response.ok) {
        setOrder(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5F1]">
          <h2 className="text-2xl font-bold text-[#3A291D]">Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5F1]">
          <h2 className="text-2xl font-bold text-red-600">Order not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  const custom = order.customizationId;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8F5F1] py-10 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-serif font-bold text-[#3A291D] mb-8 pb-4 border-b border-gray-100">
              Customized Cake Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Configuration Specifications Column */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Flavor</p>
                  <h3 className="text-xl font-bold text-[#2C1E14]">{custom.flavor}</h3>
                </div>

                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Size</p>
                  <h3 className="text-xl font-bold text-[#2C1E14]">{custom.size} Pound</h3>
                </div>

                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Shape</p>
                  <h3 className="text-xl font-bold text-[#2C1E14]">{custom.shape}</h3>
                </div>

                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Cake Inscription Message</p>
                  <h3 className="text-lg text-[#3A291D] bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                    "{custom.message || "No message Specified"}"
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Toppings</p>
                  <div className="flex flex-wrap gap-2">
                    {custom.toppings && custom.toppings.length > 0 ? (
                      custom.toppings.map((topping: string, index: number) => (
                        <span
                          key={index}
                          className="bg-[#F5F2EB] text-[#3A291D] font-medium px-3 py-1 rounded-full text-sm border border-orange-100/40"
                        >
                          {topping}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500 italic">None Selected</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Media Preview & Summary Parameters Column */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Inspiration Image</p>
                  {custom.inspoImage ? (
                    <div className="p-2 border border-gray-200 rounded-xl bg-gray-50 shadow-sm max-w-sm mx-auto md:mx-0">
                      <img
                        src={`http://localhost:5000${custom.inspoImage}`}
                        alt="Inspiration reference file"
                        className="w-full h-56 object-contain rounded-lg bg-white"
                      />
                    </div>
                  ) : (
                    <div className="h-56 max-w-sm rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                      <span className="text-3xl mb-1">📷</span>
                      <span className="text-sm">No Inspiration Image Provided</span>
                    </div>
                  )}
                </div>

                {/* Info Metadata Block */}
                <div className="pt-4 border-t border-gray-100 space-y-3.5 text-sm text-[#3A291D]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Delivery Date</span>
                    <span className="font-semibold">
                      {new Date(custom.deliveryDateTime).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Delivery Location</span>
                    <span className="font-semibold capitalize">{order.deliveryLocation}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Payment Method</span>
                    <span className="font-semibold uppercase tracking-wider text-xs bg-amber-100/60 px-2 py-0.5 rounded text-amber-900">
                      {order.paymentMethod}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Status</span>
                    <span
                      className={`font-bold uppercase tracking-wide text-xs px-2.5 py-1 rounded-full ${
                        order.status === "placed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Total pricing container */}
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
                    <span className="text-base font-serif font-bold text-[#2C1E14]">Grand Total</span>
                    <span className="text-2xl font-black text-[#2C1E14]">
                      Rs {order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}