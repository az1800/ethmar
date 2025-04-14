import Footer from "@/components/Footer";
import Header from "../../components/Header";
import Members from "../../components/Members";

export default function page() {
  return (
    <>
      <div className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20] min-h-[70vh] flex flex-col">
        <Header />
        <div className="my-auto">
          {" "}
          <h1 className="text-4xl text-white text-center mb-9">
            <b>من نحن</b>
          </h1>
          <p
            className="text-2xl text-white  mx-auto text-center max-w-[50%] mb-7"
            dir="rtl"
          >
            إثمار هي مبادرة مالية طلابية بجامعة الملك سعود تحت برنامج الشراكة
            الطلابية، تهدف إلى نشر الوعي المالي وتعزيز مهارات التخطيط المالي لدى
            الشباب، مما يمكنهم من اتخاذ قرارات مالية مستدامة تسهم في تحقيق
            تطلعاتهم المستقبلية، تماشيًا مع رؤية المملكة 2030 وبرنامج تطوير
            القطاع المالي
          </p>
        </div>
      </div>
      <div className="mx-20 flex flex-col gap-6">{<Members />}</div>
      <Footer /> {/* Always stays at the bottom */}
    </>
  );
}
