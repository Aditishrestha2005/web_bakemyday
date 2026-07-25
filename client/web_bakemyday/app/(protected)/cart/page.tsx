"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";


import Navbar from "./../../(public)/_components/Navbar";
import Footer from "./../../(public)/_components/Footer";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);

   const [selectedItems, setSelectedItems] =
    useState<string[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);
  const router = useRouter();

  const fetchCart = async () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user._id) return;

    const response = await fetch(
      `http://localhost:5000/api/cart/${user._id}`
    );

    const data = await response.json();

    setCart(data.data);
  };

 const handleDelete = async (
  
  menuId: string
) => {
  try {
    
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const response = await fetch(
      `http://localhost:5000/api/cart/${user._id}/${menuId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchCart();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleIncrease = async (
  menuId: string
) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const response = await fetch(
      "http://localhost:5000/api/cart/add",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          menuId,
        }),
      }
    );

    if (response.ok) {
      fetchCart();
    }

  } catch (error) {
    console.error(error);
  }
};

const handleDecrease = async (
  menuId: string
) => {
  try {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const response = await fetch(
      "http://localhost:5000/api/cart/decrease",
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          menuId,
        }),
      }
    );

    if (response.ok) {
      fetchCart();
    }

  } catch (error) {
    console.error(error);
  }
};


const handleCheckboxChange = (
  menuId: string
) => {
  setSelectedItems((prev) =>
    prev.includes(menuId)
      ? prev.filter(
          (id) => id !== menuId
        )
      : [...prev, menuId]
  );
};
  const total =
    cart?.items?.reduce(
      (sum: number, item: any) =>
        sum +
        item.menuId.price *
          item.quantity,
      0
    ) || 0;

    const selectedCartItems =
  cart?.items?.filter(
    (item: any) =>
      selectedItems.includes(
        item.menuId._id
      )
  ) || [];

const selectedTotalItems =
  selectedCartItems.reduce(
    (sum: number, item: any) =>
      sum + item.quantity,
    0
  );

const selectedTotal =
  selectedCartItems.reduce(
    (sum: number, item: any) =>
      sum +
      item.menuId.price *
        item.quantity,
    0
  );

  const totalItems =
  cart?.items?.reduce(
    (sum: number, item: any) =>
      sum + item.quantity,
    0
  ) || 0;

const handleSelectAll = () => {

  if (
    selectedItems.length ===
    cart?.items?.length
  ) {

    setSelectedItems([]);

  } else {

    setSelectedItems(
      cart?.items?.map(
        (item: any) =>
          item.menuId._id
      ) || []
    );

  }
};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8F5F1] p-8">

        <h1 className="text-5xl font-bold text-[#3A291D] mb-10">
          My Cart
        </h1>

        {cart?.items?.length === 0 ? (
          <p className="text-[#3A291D]">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">

  <input
    type="checkbox"
    checked={
      selectedItems.length ===
        cart?.items?.length &&
      cart?.items?.length > 0
    }
    onChange={handleSelectAll}
    className="w-5 h-5"
  />

  <span className="font-medium text-[#3A291D]">
    Select All
  </span>

</div>
              {cart?.items?.map(
                (item: any) => (
                  <div
                    key={item.menuId._id}
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      py-6
                    "
                  >

          <div className="flex gap-5 items-center">

<input
  type="checkbox"
  checked={selectedItems.includes(
    item.menuId._id
  )}
  onChange={() =>
    handleCheckboxChange(
      item.menuId._id
    )
  }
  className="w-5 h-5"
/>
                      <img
                        src={`http://localhost:5000${item.menuId.image}`}
                        alt={item.menuId.name}
                        className="
                          w-28
                          h-28
                          object-contain
                        "
                      />

                      <div>

                        <h2 className="text-2xl font-bold text-[#3A291D]">
                          {item.menuId.name}
                        </h2>

                        <p className="text-[#6B7280] mt-2 max-w-md">
                          {item.menuId.description}
                        </p>

                        <p className="font-bold text-xl mt-3 text-[#3A291D]">
                          Rs {item.menuId.price}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

  <button
    onClick={() =>
      handleDelete(item.menuId._id)
      
    }
    className="
      text-red-500
      hover:text-red-700
    "
  >
    <Trash2 size={18} />
  </button>

                    <button
  onClick={() =>
    handleDecrease(
      item.menuId._id
    )
  }
  className="
    w-8
    h-8
    bg-[#E9DFC8]
    text-[#3A291D]
    rounded
  "
>
  -
</button>
                      <span className="text-[#3A291D] font-medium">
                        {item.quantity}
                      </span>

                   <button
  onClick={() =>
    handleIncrease(
      item.menuId._id
    )
  }
  className="
    w-8
    h-8
    bg-[#7B5A45]
    text-white
    rounded
  "
>
  +
</button>
                    </div>

                  </div>
                )
              )}

            </div>

            <div
              className="
                bg-white
                border
                rounded-lg
                p-6
                h-fit
                shadow-sm
              "
            >
              <h2 className="text-2xl font-bold text-[#3A291D] mb-6">
                Order Summary
              </h2>
   

              <div className="space-y-4">

                <div className="flex justify-between text-[#3A291D]">
                  <span>Total Items</span>
                  <span>
                    {selectedTotalItems}
                  </span>
                </div>

                <div className="flex justify-between text-[#3A291D]">
                  <span>Delivery</span>
                  <span>Rs 100</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-xl text-[#3A291D]">
                  <span>Total</span>
                  <span>
                    Rs {
  selectedTotalItems > 0
    ? selectedTotal + 100
    : 0
}
                  </span>
                </div>

              </div>

             
              <button
  onClick={() => {

    if (
      selectedItems.length === 0
    ) {
      alert(
        "Please select items first"
      );
      return;
    }

  const selectedCartData =
  cart.items
    .filter((item: any) =>
      selectedItems.includes(
        item.menuId._id
      )
    )
    .map((item: any) => ({
      menuId:
        item.menuId._id,
      quantity:
        item.quantity,
      name:
        item.menuId.name,
      price:
        item.menuId.price,
    }));

localStorage.setItem(
  "selectedCartItems",
  JSON.stringify(
    selectedCartData
  )
);
console.log(
  JSON.parse(
    localStorage.getItem("user") || "{}"
  )
);

    router.push(
      "/order?type=cart"
    );

  }}
  className="
    w-full
    mt-8
    bg-[#B6AF8C]
    text-[#3A291D]
    py-3
    rounded
    hover:bg-[#A89F73]
    transition
  "
>
  Confirm Order
</button>

            </div>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}