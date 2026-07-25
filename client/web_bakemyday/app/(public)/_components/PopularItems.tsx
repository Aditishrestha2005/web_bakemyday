import Image from "next/image";

export default function PopularItems() {
  const items = [
    {
      name: "Brownie",
      image: "/brownie.png",
    },
    {
      name: "Chocochips Cookie",
      image: "/cookie.png",
    },
    {
      name: "Pistachio Croissant",
      image: "/croissant.png",
    },
    {
      name: "Pain au Chocolat",
      image: "/pain-au-chocolat.png",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-center font-serif text-[64px] font-bold text-[#3A291D] mb-10">
          Popular Items
        </h2>

        <div className="grid grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[#FFFBF7] rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="h-[260px] flex items-center justify-center p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={250}
                  height={250}
                  className="object-contain"
                />
              </div>
              <div className="pb-5">
                <h3 className="text-center font-serif text-[24px] font-semibold text-[#3A291D]">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}