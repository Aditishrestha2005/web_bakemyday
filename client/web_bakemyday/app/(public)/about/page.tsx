import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="bg-[#FFFFFF] py-6">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-2 gap-6">

            <div>
              <Image
                src="/about-banner.png"
                alt="Bakery"
                width={700}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-serif text-[64px] font-bold text-[#3A291D] mb-4">
                About Us
              </h1>

              <p className="text-[#3A291D] text-[15px] leading-8">
                At Bake My Day, baking is more than just creating desserts it is about bringing joy, comfort, and sweet memories to every customer. Founded with a passion for fresh baking and creative flavors, Bake My Day offers a delightful range of cakes, cupcakes, pastries, cookies, brownies, and customized treats made with care and quality ingredients. Every item is prepared fresh to ensure delicious taste, beautiful presentation, and a memorable experience for every occasion. Whether it is a birthday celebration, anniversary, family gathering, or a simple craving for something sweet, the bakery focuses on turning ordinary moments into special ones through handcrafted desserts and warm service. With a cozy and welcoming atmosphere, customizable cake options, and attention to detail in every order, Bake My Day aims to spread happiness one bite at a time. The bakery believes that every celebration deserves something special, and every customer deserves desserts made with love, creativity, and dedication. Whether it is a birthday celebration, anniversary, family gathering, or a simple craving for something sweet,  Whether it is a birthday celebration, anniversary, family gathering, or a sweet,
              </p>

              <p className="text-[#3A291D] text-[15px] leading-8 mt-4">
                Every bite is prepared fresh to ensure delicious taste,
                beautiful presentation, and a memorable experience for every
                occasion. Whether it is a birthday celebration, anniversary,
                family gathering, or a simple craving for something sweet,
                the bakery focuses on turning ordinary moments into special ones.
              </p>

              <p className="text-[#3A291D] text-[15px] leading-8 mt-4">
                With a cozy and welcoming atmosphere, customizable cake
                options, and attention to detail, Bake My Day has become a
                trusted destination for dessert lovers seeking quality and
                creativity.
              </p>
            </div>

          </div>
        </div>
      </section>
      <section className="bg-[#FFFFFF] py-10">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 gap-10 items-center">

            <div>
              <h2 className="font-serif text-[36px] text-[#3A291D] mb-8">
                Frequently Asked Questions (FAQs)
              </h2>

              <div className="space-y-6">
                <details className="border-b border-gray-300 pb-3">
                  <summary className="cursor-pointer text-[#3A291D]">
                    What products are available at Bake My Day?
                  </summary>
                  <p className="mt-3 text-gray-700">
                    We offer cakes, cupcakes, cookies, pastries,
                    brownies, and customized desserts.
                  </p>
                </details>

                <details className="border-b border-gray-300 pb-3">
                  <summary className="cursor-pointer text-[#3A291D]">
                    Can cakes be customized?
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Yes, we create personalized cakes for birthdays,
                    weddings, anniversaries, and other occasions.
                  </p>
                </details>

                <details className="border-b border-gray-300 pb-3">
                  <summary className="cursor-pointer text-[#3A291D]">
                     Do you use fresh ingredients?
                  </summary>
                  <p className="mt-3 text-gray-700">
                  Absolutely! Every dessert is prepared using fresh,
                    high-quality ingredients to ensure the best taste and
                    quality.
                  </p>
                </details>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/faq-image.png"
                alt="FAQ"
                width={300}
                height={300}
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}