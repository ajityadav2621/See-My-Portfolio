"use client"
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import CertificationSlider from "../components/CertificationSlider";
import AvatarChat from "../components/AvatarChat";
import Footer from "../components/Footer";
// import ExperienceMindMap from "../components/ExperienceMindMap";


export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        {/* <ExperienceMindMap /> */}
        <CertificationSlider />
      </main>
      <Footer />
      <AvatarChat />
    </div>
  );
}