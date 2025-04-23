import Footer from "@/components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import ethmarlogoP from "../../Assets/ethmarlogoP.svg";
import Companies from "@/components/Companies";
import HeroSection from "@/components/HeroSection";

export default function page() {
  return (
    <>
      <HeroSection
        type="title"
        title=""
        content="نؤمن بأن النجاح يُبنى على التعاون والشراكات القوية. نعتز بشركاتنا التي اسهمت في تحقيق رؤيتنا وتعزيز أثرنا."
      />
      <>
        <Companies />
      </>
      <Footer />
    </>
  );
}
