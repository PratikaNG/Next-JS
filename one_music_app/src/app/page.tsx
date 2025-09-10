import FeaturedSection from "@/components/featuredSection";
import Footer from "@/components/footer";
import HeroSection from "@/components/heroSection";
import Instructors from "@/components/instructor";
import TestimonialCards from "@/components/testimonialCards";
import UpcomingWebinars from "@/components/upcomingWebinars";
import WhyChooseUsSection from "@/components/whyChooseUsSection";
import Image from "next/image";

export default function Home() {
  return (  
     <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.2]">
    <h1 className="text-2xl text-center">
     Learning
    </h1>
    <HeroSection/>
    <FeaturedSection/>
    <WhyChooseUsSection/>
    <TestimonialCards/>
    <UpcomingWebinars/>
    <Instructors/>
    <Footer/>
    </main>
  );
}
