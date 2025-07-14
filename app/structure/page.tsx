import Footer from "@/components/Footer";
import Header from "../../components/Header";
import Members from "../../components/Members";
import HeroSection from "@/components/HeroSection";
import { fetchHeroSectiondata } from "@/Services/heroSectionsAPI";

export default async function page() {
  let heroData = null;

  try {
    // Fetch hero section data for the partners page
    heroData = await fetchHeroSectiondata("الهيكلة"); // or whatever page_title you use for partners
  } catch (error) {
    console.error("Failed to fetch hero section data:", error);
    // Fallback to default content if fetch fails
  }
  return (
    <>
      <>
        <div className="my-auto">
          <HeroSection
            type="title"
            title={heroData?.title || "الهيكلة"}
            content={heroData?.description || "تعرف على هيكلية فريقنا"}
          />{" "}
        </div>
      </>
      <div className="mx-20 flex flex-col gap-6">{<Members />}</div>
      <Footer /> {/* Always stays at the bottom */}
    </>
  );
}
