"use client";
import Navbar from "@/components/landing/navbar";
import Principal from "@/components/landing/principal";
import DataCards from "@/components/landing/dataCards";
import InfoPage from "@/components/landing/infoPage";
import Pueblos from "@/components/landing/pueblos";
import Footer from "@/components/landing/Footer";


const ThemeSwitcher = () => {

  return (
    <div>
      <Navbar />
      <Principal />
      <div className="p-10">
        <DataCards />
        {/* Meter esto como hacer ruta en scroll
        https://gsap.com/ */}
        <InfoPage />
        <Pueblos />
        <Footer />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
