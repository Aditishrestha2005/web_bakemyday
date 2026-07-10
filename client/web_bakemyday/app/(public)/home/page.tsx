import Navbar from "../_components/Navbar";
import Hero from "../_components/Hero";
import About from "../_components/About";
import WhyChooseUs from "../_components/WhyChooseUs";
import PopularItems from "../_components/PopularItems";
import Footer from "../_components/Footer";

export default function HomePage() {
  return (
    <main>
      <div className="bg-[#3A291D]">
        <Navbar />
        <Hero />
      </div>

      <About />
      <WhyChooseUs />
      <PopularItems />
      <Footer />
    </main>
  );
}