"use client";

import { useEffect, useState } from "react";
import Navbar from "../../(public)/_components/Navbar";
import Footer from "../../(public)/_components/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Imported Link for clean internal page routing

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    fetchOrders(user._id);
  }, []);

  const fetchOrders = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/user/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const groupedOrders = orders.reduce((groups: any, order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(order);
    return groups;
  }, {});

  const handleOrderAgain = (order: any) => {
    if (order.orderType === "customized") {
      alert("Customized cakes cannot be reordered yet");
      return;
    }

    const firstItem = order.items?.[0]?.menuId;
    if (!firstItem) return;

    localStorage.setItem("directOrderItem", JSON.stringify(firstItem));
    router.push("/order?type=menu");
  };

  const handleCancelOrder = async (orderId: string) => {
    const confirmCancel = confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/order/cancel/${orderId}`,
        { method: "PUT" }
      );
      const data = await response.json();

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
        alert("Order cancelled successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-[#3A291D] mb-10">
          Order History
        </h1>

        {/* Dynamic empty state handler block */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <span className="text-6xl mb-4">📦</span>
            <h2 className="text-2xl font-serif font-bold text-[#3A291D] mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-sm font-medium">
              Start exploring our menu to place your first order at BakeMyDay!
            </p>
            <Link
              href="/menu"
              className="bg-[#B6AF8C] hover:bg-[#A69C73] text-[#3A291D] font-serif font-bold px-8 py-3 rounded shadow-sm transition"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          Object.entries(groupedOrders).map(([date, orders]: any) => (
            <div key={date} className="mb-12">
              <h2 className="text-xl font-semibold text-gray-500 mb-4">
                {date}
              </h2>

              <div className="space-y-4">
                {orders.map((order: any) => {
                  const firstItem = order.items?.[0]?.menuId;

                  return (
                    <div
                      key={order._id}
                      className="bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        {order.orderType === "customized" ? (
                          <div className="w-24 h-24 rounded-full bg-[#F8F5F1] flex items-center justify-center text-4xl">
                            🎂
                          </div>
                        ) : (
                          <img
                            src={`http://localhost:5000${firstItem?.image}`}
                            alt={firstItem?.name}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        )}

                        <div>
                          <h3 className="text-xl font-bold text-[#3A291D]">
                            {firstItem?.name || "Customized Cake"}
                          </h3>

                          <p className="text-sm text-gray-500 max-w-lg">
                            {firstItem?.description || "Customized cake order"}
                          </p>

                          <p
                            className={`text-sm font-semibold mt-2 ${
                              order.status === "cancelled"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            Status: {order.status}
                          </p>

                          <p className="font-bold text-lg mt-2 text-[#3A291D]">
                            Rs {firstItem?.price || order.totalAmount}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-end">
                        {order.orderType === "customized" ? (
                          <button
                            onClick={() => router.push(`/order/details/${order._id}`)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium border border-gray-300 transition"
                          >
                            View Details
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOrderAgain(order)}
                            className="bg-[#B6AF8C] hover:bg-[#A69C73] text-[#3A291D] px-4 py-2 rounded text-sm font-medium transition"
                          >
                            Order Again
                          </button>
                        )}

                        {order.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="text-red-600 text-sm hover:underline"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}