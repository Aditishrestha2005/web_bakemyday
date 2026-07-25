"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../(public)/_components/Navbar";
import Footer from "../../(public)/_components/Footer";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    username: "", 
  });

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      setPreviewImage(
        parsedUser.profilePicture
          ? `http://localhost:5000${parsedUser.profilePicture}`
          : "/profile.png"
      );

      setFormData({
        fullName: parsedUser.fullName || "",
        phoneNumber: parsedUser.phoneNumber || "",
        location: parsedUser.location || "",
        username: parsedUser.username || "",
      });

      fetchOrders(parsedUser._id);
    }
  }, []);

  const handleConfirmLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

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

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        location: user.location || "",
        username: user.username || "",
      });
      setPreviewImage(
        user.profilePicture
          ? `http://localhost:5000${user.profilePicture}`
          : "/profile.png"
      );
      setSelectedFile(null);
    }
    setEditing(false);
  };

  const handleUpdateProfile = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("username", formData.username);

      if (selectedFile) {
        formDataToSend.append("profilePicture", selectedFile);
      }

      const response = await fetch(
        `http://localhost:5000/api/auth/profile/${user._id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        setEditing(false);
        setSelectedFile(null);
        alert("Profile updated successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-900 font-medium">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans text-[#3A291D]">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-6 py-10 flex-grow">
       =
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 text-red-700 hover:text-red-900 font-semibold text-sm transition"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-16">
          
       
          <div className="border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center relative bg-white shadow-sm min-h-[320px]">
            <div className="relative group">
              <img
                src={previewImage}
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover border border-gray-100 shadow-sm"
              />
              <label className="absolute bottom-2 right-4 bg-[#4A3525] text-white p-2.5 rounded-full cursor-pointer shadow-md hover:bg-[#3A291D] transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setPreviewImage(URL.createObjectURL(file));
                      setEditing(true); 
                    }
                  }}
                />
              </label>
            </div>
            <h2 className="text-2xl font-serif font-bold mt-6 text-[#2C1E14]">
              {formData.fullName || "User Name"}
            </h2>
          </div>

       =
          <div className="md:col-span-2 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 tracking-wide text-[#2C1E14]">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-base font-serif font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    disabled={!editing}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-orange-200/60 rounded-md p-3 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-amber-600 disabled:bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-base font-serif font-bold mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    disabled={!editing}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-orange-200/60 rounded-md p-3 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-amber-600 disabled:bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-base font-serif font-bold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full border border-orange-200/60 rounded-md p-3 text-gray-500 bg-gray-50/70 cursor-not-allowed outline-none"
                  />
                </div>

                <div>
                  <label className="block text-base font-serif font-bold mb-2">Contact Info</label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    disabled={!editing}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full border border-orange-200/60 rounded-md p-3 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-amber-600 disabled:bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-base font-serif font-bold mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    disabled={!editing}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full border border-orange-200/60 rounded-md p-3 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-amber-600 disabled:bg-gray-50/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="bg-[#B6AF8C] hover:bg-[#A39C77] text-[#2C1E14] font-medium px-8 py-2.5 rounded shadow-sm transition"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2.5 rounded transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateProfile}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded shadow-sm transition"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-200 my-10" />
        <section>
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-2xl font-serif font-bold tracking-wide text-[#2C1E14]">
              Order History
            </h3>
            <button
              onClick={() => router.push("/orderhistory")}
              className="text-sm font-medium hover:underline text-gray-600"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orders.slice(0, 4).map((order) => {
              const firstItem = order.items?.[0]?.menuId;

              return (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition"
                >
                  <div className="relative h-44 bg-white">
                    {order.orderType === "customized" ? (
                      <div className="h-full flex items-center justify-center bg-[#F8F5F1] text-[#3A291D] font-serif text-xl font-bold">
                        🎂 Customized Cake
                      </div>
                    ) : (
                      <img
                        src={`http://localhost:5000${firstItem?.image}`}
                        alt={firstItem?.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-[#3A291D] text-lg">
                        {firstItem?.name || "Customized Cake"}
                      </h4>
                      <span className="font-bold text-[#3A291D]">
                        Rs {firstItem?.price || order.totalAmount}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-2 h-10 overflow-hidden">
                      {firstItem?.description || `Customized cake delivered to ${order.deliveryLocation}`}
                    </p>
                    
                    <button
                      onClick={() => handleOrderAgain(order)}
                      className="w-full mt-4 bg-[#B6AF8C] text-[#3A291D] py-2 rounded hover:bg-[#a69c73] transition"
                    >
                      Order Again
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-7 max-w-[340px] w-full shadow-xl border border-gray-100 mx-4 animate-in fade-in zoom-in-95 duration-150 text-center sm:text-left">
            <h3 className="text-xl font-serif font-bold text-[#3A291D] tracking-tight mb-6">
              Log out from BakeMyDay?
            </h3>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-[#3A291D] hover:bg-[#2C1E14] text-white text-[15px] font-serif font-bold px-5 py-2.5 rounded-lg shadow-sm transition flex-1"
              >
                Yes, log out
              </button>
              
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-[#3A291D] text-[15px] font-semibold px-5 py-2.5 rounded-lg transition flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
