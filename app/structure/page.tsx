import Footer from "@/components/Footer";
import Header from "../../components/Header";
import Members from "../../components/Members";
import HeroSection from "@/components/HeroSection";

export default function page() {
  return (
    <>
      <>
        <div className="my-auto">
          <HeroSection
            type="title"
            title="من نحن"
            content="إثمار هي مبادرة مالية طلابية بجامعة الملك سعود تحت برنامج الشراكة
            الطلابية، تهدف إلى نشر الوعي المالي وتعزيز مهارات التخطيط المالي لدى
            الشباب، مما يمكنهم من اتخاذ قرارات مالية مستدامة تسهم في تحقيق
            تطلعاتهم المستقبلية، تماشيًا مع رؤية المملكة 2030 وبرنامج تطوير
            القطاع المالي"
          />{" "}
        </div>
      </>
      <div className="mx-20 flex flex-col gap-6">{<Members />}</div>
      <Footer /> {/* Always stays at the bottom */}
    </>
  );
}
