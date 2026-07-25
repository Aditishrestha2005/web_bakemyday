"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../(public)/_components/Navbar";
import Footer from "../(public)/_components/Footer";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export default function ExplorePage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/menu"
      );

      setMenuItems(response.data.data);
      setFilteredItems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const categories = [
    "All",
    ...new Set(
      menuItems.map(
        (item) => item.category
      )
    ),
  ];

  const filterItems = (
    category: string,
    searchTerm: string
  ) => {
    let filtered = menuItems;

    if (category !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.category === category
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
    }

    setFilteredItems(filtered);
  };

  const handleCategory = (
    category: string
  ) => {
    setSelectedCategory(category);

    filterItems(
      category,
      search
    );
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setSearch(value);

    filterItems(
      selectedCategory,
      value
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8F5F1]">

  
        <h1 className="text-center text-6xl font-bold text-[#3A291D] pt-12">
          Explore Our Menu
        </h1>

      
        <div className="flex justify-center mt-10 px-6">
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
        </div>

      
        <div className="flex justify-center flex-wrap gap-3 mt-8 mb-10">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                handleCategory(category)
              }
              className={`
                px-5
                py-2
                border
                rounded
                transition
                ${
                  selectedCategory ===
                  category
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

             
              <div className="h-44 bg-white flex items-center justify-center">

                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="
                    max-w-[160px]
                    max-h-[160px]
                    object-contain
                  "
                />

              </div>

              <div className="p-4">

                <h2 className="font-semibold text-[#3A291D] text-lg">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-500 mt-3 min-h-[60px]">
                  {item.description}
                </p>

              </div>

            </div>
          ))}
        </div>

        <Footer />

      </div>
    </>
  );
}