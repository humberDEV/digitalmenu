import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import Sell from "@/components/landing/Sell";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <HeroSection />
      <Sell />
    </div>
  );
}
