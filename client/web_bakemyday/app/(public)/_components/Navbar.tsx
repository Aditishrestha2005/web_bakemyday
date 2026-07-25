"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setIsLoggedIn(true);
      const user = JSON.parse(storedUser);
     
      const userImg = user.profilePicture || user.image; 
      
      if (userImg) {
       
        if (userImg.startsWith("/")) {
          setProfileImage(`http://localhost:5000${userImg}`);
        } else {
          setProfileImage(userImg);
        }
      }
    }
  }, []);

  return (
    <nav className="bg-[#3A291D] text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-center justify-between">
        <Link
          href="/home"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="BakeMyDay Logo"
            width={45}
            height={45}
          />

          <h1 className="text-2xl font-bold">
            BakeMyDay
          </h1>
        </Link>

        <ul className="flex items-center gap-12 text-lg">

          <li>
            <Link
              href="/home"
              className="hover:text-[#D9C9B4] transition duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-[#D9C9B4] transition duration-300"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/menu"
              className="hover:text-[#D9C9B4] transition duration-300"
            >
              Menu
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="hover:text-[#D9C9B4] transition duration-300"
            >
              Contact Us
            </Link>
          </li>

        </ul>

        {isLoggedIn ? (
          <Link href="/profile" className="flex items-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border border-white/50 hover:border-[#D9C9B4] transition duration-300"
              />
            ) : (
              <UserCircle
                size={40}
                className="
                  hover:text-[#D9C9B4]
                  transition
                "
              />
            )}
          </Link>
        ) : (
          <Link
            href="/login"
            className="
              border
              border-white
              px-6
              py-2
              hover:bg-white
              hover:text-[#3A291D]
              transition
              duration-300
            "
          >
            Log In
          </Link>
        )}

      </div>
    </nav>
  );
}