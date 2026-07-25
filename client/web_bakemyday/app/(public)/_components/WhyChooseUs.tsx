import {
  FaCookieBite,
  FaBirthdayCake,
  FaHeart,
} from "react-icons/fa";

import { GiCupcake } from "react-icons/gi";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaCookieBite />,
      title: "Freshly Baked Everyday",
      description:
        "Our cakes, pastries, and desserts are baked fresh daily to ensure rich flavor, perfect texture, and exceptional quality in every bite.",
    },
    {
      icon: <FaBirthdayCake />,
      title: "Custom Cake Designs",
      description:
        "Celebrate special moments with personalized cakes crafted to match your theme, style, and taste preferences.",
    },
    {
      icon: <GiCupcake />,
      title: "Wide Variety of Treats",
      description:
        "From cakes and cupcakes to cookies, croissants, and pastries, we offer a delightful selection for every sweet craving.",
    },
    {
      icon: <FaHeart />,
      title: "Warm & Friendly Experience",
      description:
        "We believe every customer deserves exceptional service, making every order smooth, memorable, and enjoyable.",
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-center font-serif text-[64px] font-bold text-[#3A291D] mb-10">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#B6AF8C] rounded-[8px] p-5 min-h-[190px]"
            >
              <div className="text-[#3A291D] text-[28px] mb-3">
                {feature.icon}
              </div>
              <h3 className="text-[#3A291D] font-semibold text-[14px] mb-3">
                {feature.title}
              </h3>

              
              <p className="text-[#3A291D] text-[13px] leading-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}