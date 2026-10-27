import { Metadata } from "next";
import DesignShowcase from "@/components/Design/DesignShowcase";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Designs | Hitesh Suthar",
  description:
    "A showcase of visual explorations, interfaces, mockups, and product design work.",
  openGraph: {
    title: "Designs | Hitesh Suthar",
    description:
      "A showcase of visual explorations, interfaces, mockups, and product design work.",
    images: {
      url: "./og-image.png",
      width: 1200,
      height: 630,
      alt: "Hitesh Suthar - Design Showcase",
    },
  },
};

const DesignPage = () => {
  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center justify-between min-h-screen mx-auto font-sans">
      <div className="w-full relative">
        <div className="w-full max-w-4xl mx-auto flex flex-col relative">
          <DesignShowcase />
        </div>
      </div>
      <Footer cn="py-6 max-w-4xl" />
    </div>
  );
};

export default DesignPage;
