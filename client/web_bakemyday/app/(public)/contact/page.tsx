import Image from "next/image";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="bg-[#FAF8F5] py-12 md:py-20 text-[#3A291D]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Heading Section */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
              Have questions, special requests, or feedback? Reach out to us
              and our team will get back to you as soon as possible.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT SIDE: Contact Form & Map */}
            <div className="flex flex-col gap-10">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#EADBCE]">
                <h2 className="font-serif text-3xl font-bold mb-8">
                  Get in Touch
                </h2>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 opacity-80">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full bg-transparent border-b border-[#8A817C] pb-2 outline-none text-lg transition focus:border-[#3A291D]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 opacity-80">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent border-b border-[#8A817C] pb-2 outline-none text-lg transition focus:border-[#3A291D]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 opacity-80">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={4}
                      className="w-full bg-transparent border-b border-[#8A817C] pb-2 outline-none resize-none text-lg transition focus:border-[#3A291D]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#B6AF8C] text-[#3A291D] font-semibold px-8 py-3.5 rounded-xl shadow-md hover:bg-[#a69f7c] active:scale-95 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Map Container */}
              <div className="overflow-hidden rounded-2xl shadow-sm border border-[#EADBCE]">
                <Image
                  src="/map.png"
                  alt="Location Map"
                  width={600}
                  height={320}
                  className="w-full h-[280px] object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Banner Image & Info */}
            <div className="flex flex-col gap-10">
              <div className="overflow-hidden rounded-2xl shadow-sm border border-[#EADBCE]">
                <Image
                  src="/contact-image.png"
                  alt="Bakery Ambiance"
                  width={700}
                  height={450}
                  className="w-full h-[360px] md:h-[420px] object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#EADBCE] space-y-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4 border-b border-[#EADBCE] pb-2">
                    Contact Info
                  </h3>
                  <ul className="space-y-3 text-lg opacity-90">
                    <li className="flex items-center gap-3">
                      <span>📍</span> Putalisadak, Kathmandu
                    </li>
                    <li className="flex items-center gap-3">
                      <span>📞</span> +977 9876543210
                    </li>
                    <li className="flex items-center gap-3">
                      <span>✉️</span> info@bakemyday.com
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4 border-b border-[#EADBCE] pb-2">
                    Working Hours
                  </h3>
                  <p className="text-lg opacity-90">
                    ⏰ 7:30 AM – 9:30 PM <span className="text-sm block sm:inline text-gray-500">(Mon – Sun)</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}