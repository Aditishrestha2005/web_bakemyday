"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const handleOrderNow = () => {
    const user =
      localStorage.getItem("user");

    if (!user) {
      router.push("/please-login");
    } else {
      router.push("/menu");
    }
  };

  const handleExplore = () => {
    router.push("/explore");
  };

  return (
    <section className="bg-[#3A291D] text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-16 flex items-center justify-between">

        <div className="max-w-[600px]">

          <h1 className="font-serif text-[72px] font-bold leading-[1.15]">
            Freshly Baked
            <br />
            Happiness,
            <br />
            Delivered to Your Door
          </h1>

          <p className="mt-6 text-[#E8E0D8] max-w-[500px]">
            From oven to your doorstep,
            treat loved ones with sweetness
            and create memorable dessert
            experiences.
          </p>

          <div className="mt-8 flex gap-4">

            <button
              onClick={handleOrderNow}
              className="
                border
                border-white
                px-6
                py-2
                hover:bg-white
                hover:text-[#3A291D]
                transition
              "
            >
              Order Now
            </button>

            <button
              onClick={handleExplore}
              className="
                bg-white
                text-[#3A291D]
                px-6
                py-2
                hover:bg-[#E8E0D8]
                transition
              "
            >
              Explore
            </button>

          </div>

        </div>

        <div>
          <Image
            src="/cakeh.png"
            alt="Cake"
            width={450}
            height={450}
            priority
          />
        </div>

      </div>
    </section>
  );
}