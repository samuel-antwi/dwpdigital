import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <HeroSection />
    </div>
  );
}
