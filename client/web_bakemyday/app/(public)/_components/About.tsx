import Image from "next/image";

export default function About() {
  return (
    <section className="bg-[#F4EFEF] py-4">
      <div className="max-w-[1440px] mx-auto px-3">
        <div className="grid grid-cols-2 gap-6 items-center">

          
          <div>
            <Image
              src="/about-cake.png"
              alt="About Us"
              width={700}
              height={500}
              className="w-full h-[420px] object-cover"
              priority
            />
          </div>

          {/* Right Content */}
          <div className="h-[420px] flex flex-col justify-start">
            <h2 className="font-serif text-[72px] font-bold text-[#3A291D] leading-none mb-6">
              About Us
            </h2>

            <p className="text-[#3A291D] text-[16px] leading-8">
              At Bake My Day, every treat is crafted to bring happiness
              to every celebration and everyday moment. The bakery offers
              freshly baked cakes, pastries, cupcakes, cookies, and custom
              desserts made with quality ingredients and creative designs.
              From birthdays and special occasions to simple sweet cravings,
              Bake My Day focuses on delivering delicious flavors, beautiful
              presentation, and a warm customer experience. With easy ordering,
              customizable options, and a passion for baking, the goal is to
              make every order special and every bite memorable.Every product is
              prepared with attention to freshness, quality, and taste. 
              The bakery offers a variety of customizable designs and flavors to
              suit different occasions and preferences. By combining creativity 
              with exceptional service, Bake My Day aims to create memorable 
              experiences for every customer.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}