import Footer from "@/components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import ethmarlogoP from "../../Assets/ethmarlogoP.svg";
import Companies from "@/components/Companies";

export default function page() {
  return (
    <>
      <div className="bg-gradient-to-r from-[#1F682C] to-[#164B20] min-h-[70vh] flex flex-col">
        <Header />
        <p
          className="text-2xl text-white max-w-[50%] mx-auto text-center my-auto"
          dir="rtl"
        >
          نؤمن بأن النجاح يُبنى على التعاون والشراكات القوية. نعتز بشركاتنا التي
          اسهمت في تحقيق رؤيتنا وتعزيز أثرنا.
        </p>
      </div>
      <div className="grid grid-cols-2 m-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mx-auto">
        <Companies />
      </div>
      <Footer />
    </>
  );
}
