import FeaturedSection from "@/components/featuredSection";
import HeroSection from "@/components/heroSection";
import Image from "next/image";

export default function Home() {
  return (  
     <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.2]">
    <h1 className="text-2xl text-center">
     Learning
    </h1>
    <HeroSection/>
    <FeaturedSection/>
    </main>
  );
}
