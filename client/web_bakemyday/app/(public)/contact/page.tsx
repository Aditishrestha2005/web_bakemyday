import Image from "next/image";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="bg-[#FFFFFF] py-12">
        <div className="max-w-[1400px] mx-auto px-12">

          {/* Heading */}
          <div className="text-center mb-20">
            <h1 className="font-serif text-[64px] font-bold text-[#3A291D]">
              We'd Love to Hear From You
            </h1>

            <p className="text-gray-500 max-w-[600px] mx-auto mt-4">
              Have questions, special requests, or feedback? Reach out to us
              and our team will get back to you as soon as possible.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-24">

            {/* LEFT SIDE */}
            <div>
              <h2 className="font-serif text-[42px] font-bold text-[#3A291D] mb-10">
                Get in Touch
              </h2>

              <form className="space-y-8 max-w-[500px]">

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-[#8A817C] pb-2 outline-none text-lg"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-[#8A817C] pb-2 outline-none text-lg"
                />

                <textarea
                  placeholder="Message"
                  rows={2}
                  className="w-full bg-transparent border-b border-[#8A817C] pb-2 outline-none resize-none text-lg"
                />

                <button
                  type="submit"
                  className="bg-[#B6AF8C] text-[#3A291D] px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </form>

              {/* Map */}
              <div className="mt-16">
                <Image
                  src="/map.png"
                  alt="Map"
                  width={520}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>

              <Image
                src="/contact-image.png"
                alt="Bakery Contact"
                width={700}
                height={450}
                className="w-full h-[420px] object-cover mb-12"
              />

              <div>
                <h3 className="font-serif text-[48px] font-bold text-[#3A291D] mb-6">
                  Contact Us On
                </h3>

                <p className="text-[#3A291D] text-xl">
                  Putalisadak, Kathmandu
                </p>

                <p className="text-[#3A291D] text-xl mt-3">
                  +977 9876543210
                </p>

                <p className="text-[#3A291D] text-xl mt-3">
                  info@bakemyday.com
                </p>

                <h3 className="font-serif text-[48px] font-bold text-[#3A291D] mt-12 mb-6">
                  WORKING HOURS
                </h3>

                <p className="text-[#3A291D] text-xl">
                  7:30 AM to 9:30 PM on Weekdays
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}