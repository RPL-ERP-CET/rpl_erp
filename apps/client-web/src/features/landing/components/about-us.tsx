import Image from "next/image";

type AboutUsContent = {
  title: string;
  description: string;
  image: string;
};

const ABOUT_US_CONTENT = [
  {
    title: "Ayiranallur Estate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ex beatae illo veritatis, delectus ab, quas tempora magni quis dolorem ut velit rerum minus officia harum nisi deleniti. Ab, magni!",
    image:
      "https://rplkerala.com/wp-content/uploads/2019/02/kulathupuzaestate-300x167.jpg",
  },
  {
    title: "Kulathupuzha Estate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ex beatae illo veritatis, delectus ab, quas tempora magni quis dolorem ut velit rerum minus officia harum nisi deleniti. Ab, magni!",
    image:
      "https://rplkerala.com/wp-content/uploads/2019/02/kulathupuzaest001-300x167.jpg",
  },
  {
    title: "Factories",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ex beatae illo veritatis, delectus ab, quas tempora magni quis dolorem ut velit rerum minus officia harum nisi deleniti. Ab, magni!",
    image:
      "https://rplkerala.com/wp-content/uploads/2019/02/factory001-300x167.jpg",
  },
];

const AboutUsCard = ({ content }: { content: AboutUsContent }) => {
  return (
    <div className="relative w-full h-96 shadow-md rounded-2xl border overflow-hidden group hover:shadow-emerald-500/40 hover:border-emerald-400 transition-all ease-in-out duration-500">
      {/* Background Image with hover zoom */}
      <Image
        src={content.image}
        alt={content.title}
        width={300}
        height={400}
        className="absolute z-0 w-full h-full object-cover rounded-2xl transform group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-in-out"
      />

      {/* Overlay with gradient */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10 bg-gradient-to-t from-emerald-700/90 via-emerald-500/70 to-transparent text-white transition-all duration-700 ease-in-out max-h-24 group-hover:max-h-full overflow-hidden">
        {/* Title (always visible, animates slightly on hover) */}
        <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-md transition-all duration-700 group-hover:translate-y-[-4px]">
          {content.title}
        </h2>

        {/* Description (slides in on hover with fade) */}
        <p className="mt-3 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 ease-out delay-200">
          {content.description}
        </p>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-4 group-hover:ring-emerald-400/30 transition-all duration-700"></div>
    </div>
  );
};

export default function AboutUs() {
  return (
    <section id="about-us" className="px-8 py-16 flex gap-4 bg-white">
      {ABOUT_US_CONTENT.map((content, index) => (
        <AboutUsCard key={index} content={content} />
      ))}
    </section>
  );
}
