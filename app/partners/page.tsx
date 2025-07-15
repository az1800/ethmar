import Footer from "@/components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import ethmarlogoP from "../../Assets/ethmarlogoP.svg";
import Companies from "@/components/Companies";
import HeroSection from "@/components/HeroSection";
import { fetchHeroSectiondata } from "@/Services/heroSectionsAPI";

export default async function page() {
  let heroData = null;

  try {
    // Fetch hero section data for the partners page
    heroData = await fetchHeroSectiondata("شركاء النجاح"); // or whatever page_title you use for partners
  } catch (error) {
    console.error("Failed to fetch hero section data:", error);
    // Fallback to default content if fetch fails
  }

  return (
    <>
      <HeroSection
        type="title"
        title={heroData?.title || ""}
        content={heroData?.description || ""}
      />
      <Companies />
      <Footer />
    </>
  );
}
