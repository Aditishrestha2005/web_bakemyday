"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../(public)/_components/Navbar";
import Footer from "../../(public)/_components/Footer";

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const customizationId = searchParams.get("customizationId");

  const [loading, setLoading] = useState(true);
  const [isPlacing, setIsPlacing] = useState(false);
  const [summaryItems, setSummaryItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryLocation: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
      deliveryLocation: "",
    });

    loadOrderData();
  }, []);

  const loadOrderData = async () => {
    try {
      if (type === "menu") {
        const item = JSON.parse(localStorage.getItem("directOrderItem") || "{}");

        if (item && item._id) {
          setSummaryItems([
            {
              menuId: item._id,
              name: item.name,
              quantity: 1,
              price: item.price,
            },
          ]);

          setTotalAmount(item.price + 100);
        }
      } else if (type === "cart") {
        const items = JSON.parse(localStorage.getItem("selectedCartItems") || "[]");
        setSummaryItems(items);

        const subtotal = items.reduce(
          (sum: number, item: any) => sum + item.price * item.quantity,
          0
        );

        setTotalAmount(subtotal + 100);
      } else if (type === "customized") {
        const response = await fetch(
          `http://localhost:5000/api/customization/${customizationId}`
        );

        const data = await response.json();
        const custom = data.data;

        setSummaryItems([
          {
            flavor: custom.flavor,
            size: custom.size,
            shape: custom.shape,
            toppings: custom.toppings,
            totalPrice: custom.totalPrice,
          },
        ]);

        setTotalAmount(custom.totalPrice);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (!formData.deliveryLocation) {
        alert("Please enter delivery location");
        return;
      }

      setIsPlacing(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const orderData: any = {
        userId: user._id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        deliveryLocation: formData.deliveryLocation,
        totalAmount,
        paymentMethod: "COD",
        status: "placed",
      };

      if (type === "customized") {
        orderData.orderType = "customized";
        orderData.customizationId = customizationId;
        orderData.items = [];
      } else {
        orderData.orderType = "normal";
        orderData.items = summaryItems.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        }));
      }

      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        if (type === "cart") {
          const user = JSON.parse(localStorage.getItem("user") || "{}");

          for (const item of summaryItems) {
            await fetch(
              `http://localhost:5000/api/cart/${user._id}/${item.menuId}`,
              {
                method: "DELETE",
              }
            );
          }

          localStorage.removeItem("selectedCartItems");
        }

        // Successfully routes straight to your new success screen!
        router.push("/order-success");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsPlacing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center font-serif text-xl font-bold text-[#3A291D]">
          Loading order parameters...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8F5F1] py-12 px-16 w-full">
        <div className="w-full text-left space-y-8">
          
          <div>
            <h1 className="text-5xl font-serif font-bold text-[#3A291D] mb-2">
              Confirm Order
            </h1>
            <p className="text-gray-500 font-serif text-lg">
              Double-check your delivery coordinates and cake choices before processing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start w-full">
            
            <div className="lg:col-span-2 space-y-6 w-full">
              <div className="bg-white rounded-md border border-gray-200 p-8 shadow-sm space-y-6">
                <h2 className="text-2xl font-serif font-bold text-[#3A291D] border-b border-gray-100 pb-3">
                  Delivery Details
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-serif font-bold text-lg text-[#3A291D]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled={isPlacing}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full border border-gray-300 p-3.5 rounded-md bg-white text-[#3A291D] font-medium focus:outline-none focus:border-[#3A291D] placeholder-gray-400 shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-serif font-bold text-lg text-[#3A291D]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled={isPlacing}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 p-3.5 rounded-md bg-white text-[#3A291D] font-medium focus:outline-none focus:border-[#3A291D] placeholder-gray-400 shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-serif font-bold text-lg text-[#3A291D]">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      disabled={isPlacing}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 p-3.5 rounded-md bg-white text-[#3A291D] font-medium focus:outline-none focus:border-[#3A291D] placeholder-gray-400 shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-serif font-bold text-lg text-[#3A291D]">
                      Delivery Location
                    </label>
                    <textarea
                      disabled={isPlacing}
                      value={formData.deliveryLocation}
                      onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                      placeholder="Type your address."
                      className="w-full border border-gray-300 p-3.5 rounded-md bg-white text-[#3A291D] font-medium focus:outline-none focus:border-[#3A291D] placeholder-gray-400 shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm flex flex-col justify-between w-full">
              <div>
                <h4 className="font-bold text-xl text-[#3A291D] mb-4 font-serif border-b border-gray-100 pb-3">
                  Order Summary
                </h4>

                <div className="space-y-4 py-2">
                  {type === "customized" ? (
                    <div className="space-y-3 text-sm text-gray-700 font-medium font-sans">
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-500 font-medium">Flavor:</span>
                        <span className="text-[#3A291D] font-bold">{summaryItems[0]?.flavor || "N/A"}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-500 font-medium">Size:</span>
                        <span className="text-[#3A291D] font-bold">{summaryItems[0]?.size ? `${summaryItems[0].size}` : "N/A"}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-500 font-medium">Shape:</span>
                        <span className="text-[#3A291D] font-bold">{summaryItems[0]?.shape || "N/A"}</span>
                      </div>
                      <div className="flex flex-col gap-1 pt-1">
                        <span className="text-gray-500 font-medium">Toppings:</span>
                        <span className="text-xs text-gray-900 bg-[#FBF9F6] p-2.5 rounded border border-gray-200 font-medium mt-1 leading-relaxed">
                          {summaryItems[0]?.toppings?.length ? summaryItems[0].toppings.join(", ") : "None"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1 font-sans">
                      {summaryItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                          <div>
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-bold text-gray-900">Rs {item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {type !== "customized" && (
                    <div className="flex justify-between text-sm text-gray-600 pt-2">
                      <span>Delivery Charge</span>
                      <span>Rs 100</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg text-[#3A291D] pt-4 border-t border-dashed border-gray-300 mt-4 font-serif">
                    <span>Total Amount</span>
                    <span>Rs {totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-[#F5F2EB] border border-[#EBE5D8] p-3.5 rounded text-sm font-medium text-[#5C4D41] flex items-center gap-2">
                <span>💵</span>
                <span><strong>Payment Method:</strong> Cash On Delivery</span>
              </div>

        
              <div className="mt-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className={`w-full font-serif font-bold text-lg py-3.5 rounded shadow-sm transition-all text-center ${
                    isPlacing
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-[#C1B599] text-[#4A3B32] hover:bg-[#b0a385]"
                  }`}
                >
                  {isPlacing ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}