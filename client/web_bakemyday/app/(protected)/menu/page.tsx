"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../(public)/_components/Navbar";
import { ShoppingCart } from "lucide-react";
import Footer from "../../(public)/_components/Footer";
import { useRouter } from "next/navigation";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}


export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [cartItems, setCartItems] =
  useState<string[]>([]);

  const handleOrderNow = (
  item: MenuItem
) => {

  localStorage.setItem(
    "directOrderItem",
    JSON.stringify(item)
  );

  router.push(
    "/order?type=menu"
  );
};

useEffect(() => {
  const user = localStorage.getItem("user");

  if (!user) {
    router.push("/please-login");
    return;
  }

  fetchMenu();
  fetchCartItems();

}, []);

const fetchCartItems = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user._id) return;

    const response = await fetch(
      `http://localhost:5000/api/cart/${user._id}`
    );

    const data =
      await response.json();

    const ids =
      data.data.items.map(
        (item: any) =>
          item.menuId._id
      );
      console.log(
  "CART IDS:",
  ids
);

setCartItems(ids);

    setCartItems(ids);

  } catch (error) {

    console.error(error);

  }

};

const fetchMenu = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/menu"
    );

    setMenuItems(response.data.data);
    setFilteredItems(response.data.data);

  } catch (error: any) {

    console.log(
      "URL:",
      error?.config?.url
    );

    console.log(
      "RESPONSE:",
      error?.response?.data
    );

    console.error(error);
  }
};

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filterItems = (
    category: string,
    searchTerm: string
  ) => {
    let filtered = menuItems;

    if (category !== "All") {
      filtered = filtered.filter(
        (item) => item.category === category
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    filterItems(category, search);
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setSearch(value);
    filterItems(selectedCategory, value);
  };
const handleAddToCart = async (
  menuId: string
) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user._id) {
      alert("Please login first");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/cart/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          menuId,
        }),
      }
    );

    const data = await response.json();

  if (response.ok) {

  alert(
    "Item added to cart 🛒"
  );

  fetchCartItems();

}else {
      alert(
        data.message ||
          "Failed to add item"
      );
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8F5F1]">

        <h1 className="text-center text-6xl font-bold text-[#3A291D] pt-12">
          Our Menu
        </h1>

    
        <div className="max-w-[1400px] mx-auto mt-10 px-6">
          <div className="relative flex justify-center">

            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={handleSearch}
              className="
                w-[850px]
                border-2
                border-[#B6AF8C]
                rounded-full
                px-6
                py-3
                bg-white
                outline-none
                text-[#3A291D]
                placeholder:text-gray-400
              "
            />

            <div className="absolute right-0 flex gap-4">
<button
  onClick={() =>
    router.push("/cart")
  }
  className="
    w-13
    h-13
    rounded-full
    bg-[#3A291D]
    text-white
    flex
    items-center
    justify-center
  "
>
  <ShoppingCart size={22} />
</button>

           <button
  onClick={() =>
    router.push("/customization")
  }
  className="
    bg-[#B6AF8C]
                  bg-[#B6AF8C]
                  px-5
                  py-3
                  rounded
                  text-[#3A291D]
                  hover:bg-[#a69c73]
                  transition
                "
              >
                Customization
              </button>

            </div>
          </div>
        </div>

     
        <div className="flex justify-center flex-wrap gap-3 mt-8 mb-10">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`
                px-5
                py-2
                border
                rounded
                transition
                ${
                  selectedCategory === category
                    ? "bg-[#B6AF8C] text-white border-[#B6AF8C]"
                    : "bg-white text-[#3A291D]"
                }
              `}
            >
              {category}
            </button>
          ))}

        </div>

       
        <div
          className="
            max-w-[1400px]
            mx-auto
            px-6
            pb-20
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          "
        >
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="
                bg-white
                border
                border-[#DDD]
                rounded-xl
                overflow-hidden
                hover:shadow-md
                transition
              "
            >

             <div className="relative h-36 bg-white">

<button
  onClick={() =>
    handleAddToCart(item._id)
  }
  className={`
    absolute
    top-3
    right-3
    p-2
    rounded-full
    transition
    hover:scale-110
    ${
      cartItems.includes(item._id)
        ? "bg-[#3A291D] text-white"
        : "text-[#8B2E2E]"
    }
  `}
>
  <ShoppingCart
    size={18}
    strokeWidth={2.5}
  />
</button>
 <div className="h-full flex items-center justify-center">

                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="
                      max-w-[140px]
                      max-h-[140px]
                      object-contain
                    "
                  />
                </div>

              </div>
        <div className="p-4">

                <div className="flex justify-between items-start gap-2 min-h-[60px]">

                  <h2 className="font-semibold text-[#3A291D] text-lg leading-tight">
                    {item.name}
                  </h2>

                  <span className="font-bold text-[#3A291D] whitespace-nowrap">
                    Rs {item.price}
                  </span>

                </div>

                <p className="text-xs text-gray-500 mt-2 h-10 overflow-hidden">
                  {item.description}
                </p>

               <button
  onClick={() =>
    handleOrderNow(item)
  }
  className="      w-full

                    mt-4

                    bg-[#B6AF8C]

                    text-[#3A291D]

                    py-2

                    rounded

                    hover:bg-[#a69c73]

                    transition

                  "
>
  Order Now
</button>

              </div>

            </div>
          ))}
        </div>

     <Footer />

      </div>
    </>
  );
}