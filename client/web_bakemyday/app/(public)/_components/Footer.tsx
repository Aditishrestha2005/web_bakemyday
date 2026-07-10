import Image from "next/image";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#3A291D] text-white py-12">
      <div className="max-w-[1440px] mx-auto px-16">

        <div className="grid grid-cols-3 gap-16">

          {/* Left Section */}
          <div>
            <h2 className="font-serif text-[36px] font-bold mb-8">
              BakeMyDay
            </h2>

            <p className="text-[18px] leading-8 max-w-[400px] mb-8">
              Bake My Day focuses on delivering delicious flavors,
              beautiful presentation, and a warm customer experience.
            </p>

            <div className="space-y-3 text-[18px]">
              <p>📍 Kathmandu, Nepal</p>
              <p>📧 info@bakemyday.com</p>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-[22px] mb-4">
                Follow us on
              </h3>

              <div className="flex gap-6 text-[28px]">
                <FaInstagram />
                <FaFacebookF />
                <FaXTwitter />
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div>
            <h2 className="font-serif text-[36px] font-bold mb-8">
              Quick Links
            </h2>

            <ul className="space-y-3 text-[20px]">
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Menu</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end">
            <Image
              src="/map.png"
              alt="Map"
              width={380}
              height={220}
              className="object-cover"
            />

            <p className="text-[14px] mt-12">
              © 2020 BakeMyDay. All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}