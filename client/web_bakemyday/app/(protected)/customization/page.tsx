"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../(public)/_components/Navbar";
import Footer from "../../(public)/_components/Footer";


export default function CustomizationPage() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    flavor: "", 
    size: "",   
    shape: "",
    message: "",
    deliveryDateTime: "",
    toppings: [] as string[],
  });

  const toppings = [
    "Oreo Crumbs",
    "Chocolate Chips",
    "Sprinkles",
    "Fresh Fruits",
    "Nuts",
    "Cherries",
    "KitKat",
    "Chocolate Drizzle",
  ];

  const flavors = [
    "Chocolate",
    "Vanilla",
    "Red Velvet",
    "Black Forest",
    "White Forest",
    "Butterscotch",
    "Blueberry",
    "Strawberry",
  ];

  const cakePrices: { [key: string]: number } = {
    "0.5 Pound": 500,
    "1 Pound": 1000,
    "2 Pound": 2000,
    "3 Pound": 3000,
    "4 Pound": 4000,
  };

  // Logic to determine if a size is eligible for a Tower cake (needs to be 4 or 5 pounds)
  // In our list, only "4 Pound" meets the >= 4 pounds requirement.
  const isTowerEligible = formData.size === "4 Pound";

  const cakePrice = cakePrices[formData.size] || 0;
  const toppingsPrice = formData.toppings.length * 80;
  const deliveryCharge = formData.size ? 100 : 0;
  const totalPrice = cakePrice + toppingsPrice + deliveryCharge;

  const handleConfirmOrder =
  async () => {

    try {
        if (
  !formData.flavor ||
  !formData.size ||
  !formData.shape
) {
  alert(
    "Please fill all required fields"
  );
  return;
}

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          ) || "{}"
        );

      const form =
  new FormData();

form.append(
  "userId",
  user._id
);

form.append(
  "flavor",
  formData.flavor
);

form.append(
  "size",
  String(
    Number(
      formData.size.split(
        " "
      )[0]
    )
  )
);

form.append(
  "shape",
  formData.shape
);

form.append(
  "message",
  formData.message
);

form.append(
  "totalPrice",
  String(totalPrice)
);

form.append(
  "deliveryDateTime",
  formData.deliveryDateTime
);

formData.toppings.forEach(
  (topping) => {
    form.append(
      "toppings",
      topping
    );
  }
);



if (image) {

  form.append(
    "inspoImage",
    image
  );


}

const response =
  await fetch(
    "http://localhost:5000/api/customization",
    {
      method: "POST",
      body: form,
    }
  );
      const data =
        await response.json();

      console.log(data);

      if (
        response.ok
      ) {

        alert(
          "Customization Saved 🎂"
        );

       router.push(
  `/order?type=customized&customizationId=${data.data._id}`
);
      } else {

        alert(
          data.message
        );

      }


    } catch (
      error
    ) {

      console.error(
        error
      );

      alert(
        "Something went wrong"
      );

    }

  };
  return (
    
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8F5F1] py-12 px-16 w-full">
        <div className="w-full text-left space-y-8">
          
          <div>
            <h1 className="text-5xl font-serif font-bold text-[#3A291D] mb-2">
              Customize Your Cake
            </h1>
            <p className="text-gray-500 font-serif text-lg">
              Create a cake that's uniquely yours with custom flavors, designs, colors, and toppings made to match every celebration perfectly.
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-[#EFEBE4] text-sm text-gray-600 px-4 py-3 rounded-md flex items-center gap-2 w-full">
            <span>ⓘ Prices may vary depending on cake size, design, and customization choices.</span>
          </div>

          {/* Cake Flavor Dropdown */}
          <div className="space-y-2">
            <label className="block font-serif font-bold text-xl text-[#3A291D]">
              Cake Flavor
            </label>
            <div className="relative w-full max-w-xl">
              <select
                value={formData.flavor}
                onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                className="w-full bg-[#3A291D] text-white p-3.5 rounded-md font-medium appearance-none cursor-pointer focus:outline-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"292.4\" height=\"292.4\" fill=\"white\"><path d=\"M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px top 50%", backgroundSize: "14px auto" }}
              >
                <option value="" hidden disabled>Select your Flavor</option>
                {flavors.map((flavor) => (
                  <option key={flavor} value={flavor} className="bg-white text-gray-900">
                    {flavor}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cake Size Dropdown */}
          <div className="space-y-2">
            <label className="block font-serif font-bold text-xl text-[#3A291D]">
              Cake Size <span className="text-sm font-normal text-gray-400 font-sans ml-1">( Per pound Rs 1000 )</span>
            </label>
            <div className="relative w-full max-w-xl">
              <select
                value={formData.size}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "0.5 Pound") {
                    setFormData({ ...formData, size: value, shape: "Bento" });
                  } else if (value !== "4 Pound" && formData.shape === "Tower") {
                    // Reset shape if they select a smaller size while Tower was active
                    setFormData({ ...formData, size: value, shape: "" });
                  } else {
                    setFormData({ ...formData, size: value });
                  }
                }}
                className="w-full bg-[#3A291D] text-white p-3.5 rounded-md font-medium appearance-none cursor-pointer focus:outline-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"292.4\" height=\"292.4\" fill=\"white\"><path d=\"M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px top 50%", backgroundSize: "14px auto" }}
              >
                <option value="" hidden disabled>Select your Size</option>
                <option value="0.5 Pound" className="bg-white text-gray-900">0.5 Pound</option>
                <option value="1 Pound" className="bg-white text-gray-900">1 Pound</option>
                <option value="2 Pound" className="bg-white text-gray-900">2 Pound</option>
                <option value="3 Pound" className="bg-white text-gray-900">3 Pound</option>
                <option value="4 Pound" className="bg-white text-gray-900">4 Pound</option>
              </select>
            </div>
            {formData.size === "0.5 Pound" && (
              <p className="text-sm text-[#8B2E2E] font-sans font-semibold mt-1">* 0.5 Pound cakes are available only in Bento style.</p>
            )}
          </div>

          {/* Cake Shape Row */}
          <div className="space-y-3">
            <label className="block font-serif font-bold text-xl text-[#3A291D]">
              Cake Shape
            </label>
            <div className="flex flex-wrap gap-8">
              {["Circle", "Rectangle", "Square", "Heart", "Bento", "Tower"].map((shape) => {
                // Determine disabled status based on your explicit cake rules
                const isBentoDisabled = formData.size === "0.5 Pound" && shape !== "Bento";
                const isTowerDisabled = shape === "Tower" && formData.size !== "" && !isTowerEligible;
                const isDisabled = isBentoDisabled || isTowerDisabled;

                return (
                  <label key={shape} className="flex items-center gap-2 cursor-pointer font-serif font-bold text-xl text-[#3A291D]">
                    <input
                      type="radio"
                      name="shape"
                      value={shape}
                      checked={formData.shape === shape}
                      disabled={isDisabled}
                      onChange={(e) => setFormData({ ...formData, shape: e.target.value })}
                      className="w-5 h-5 accent-[#3A291D]"
                    />
                    <span className={isDisabled ? "text-gray-300 line-through cumulative-rule" : ""}>
                      {shape}
                    </span>
                  </label>
                );
              })}
            </div>
            {formData.size !== "" && !isTowerEligible && (
              <p className="text-sm text-gray-400 font-sans">* Tower style is only applicable for cakes that are 4 pounds or above.</p>
            )}
          </div>

          {/* Toppings Checklist */}
          <div className="space-y-3">
            <label className="block font-serif font-bold text-xl text-[#3A291D]">
              Toppings <span className="text-sm font-normal text-gray-400 font-sans ml-1">( Rs 80 each )</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {toppings.map((topping) => (
                <label key={topping} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md text-base text-gray-800 font-medium cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={formData.toppings.includes(topping)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, toppings: [...formData.toppings, topping] });
                      } else {
                        setFormData({ ...formData, toppings: formData.toppings.filter((t) => t !== topping) });
                      }
                    }}
                    className="w-5 h-5 accent-[#3A291D]"
                  />
                  <span>{topping}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Inspo Image Upload - FIXED: object-contain prevents the image from clipping/zooming */}
          <div className="space-y-2">
            <label className="block font-serif font-bold text-xl text-[#3A291D]">
              Inspo Image
            </label>
            <label className="w-full max-w-xl h-52 border border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center cursor-pointer overflow-hidden relative hover:border-gray-400 transition">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-contain bg-gray-50" />
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="mx-auto h-14 w-14 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm block mt-2 text-gray-400">[ Upload Image ]</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          {/* COMBINED LOWER AREA: MESSAGE, DATE/TIME & SUMMARY DETAILS */}
          {/* Layout keeps everything structurally sound and visible */}
          <div className="pt-4 flex flex-col lg:flex-row items-start justify-between gap-12 w-full">
            
            {/* Left aligned column block holding Message & Delivery metrics */}
            <div className="space-y-6 w-full max-w-xl">
              
              {/* Message Input - Now perfectly preserved inside the flow */}
              <div className="space-y-2 w-full">
                <label className="block font-serif font-bold text-xl text-[#3A291D]">
                  Message on Cake
                </label>
                <input
                  type="text"
                  placeholder="Eg: Happy Birthday Adi"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-300 p-3.5 rounded-md bg-white text-gray-800 focus:outline-none focus:border-[#3A291D]"
                />
              </div>

              {/* Delivery Date/Time input box */}
              <div className="space-y-2 w-full">
                <label className="block font-serif font-bold text-xl text-[#3A291D]">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.deliveryDateTime}
                  onChange={(e) => setFormData({ ...formData, deliveryDateTime: e.target.value })}
                  className="w-full max-w-xs border border-gray-300 p-3.5 rounded-md bg-white text-gray-600 focus:outline-none focus:border-[#3A291D]"
                />
              </div>

            </div>

            {/* Constant anchored Summary Box */}
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-6 shadow-sm font-sans flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xl text-[#3A291D] mb-4 font-serif">Summary Details</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Cake Price</span>
                    <span className="font-medium text-gray-900">Rs {cakePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Toppings</span>
                    <span className="font-medium text-gray-900">Rs {toppingsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="font-medium text-gray-900">Rs {deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-[#3A291D] pt-3 border-t border-dashed border-gray-300">
                    <span>Total Price</span>
                    <span>Rs {totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Confirm Order Button directly inside summary box */}
              <div className="mt-6">
                <button
onClick={handleConfirmOrder}
                  className="w-full bg-[#C1B599] text-[#4A3B32] font-serif font-bold text-lg py-3.5 rounded shadow-sm hover:bg-[#b0a385] transition"
                >
                  Confirm Order
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