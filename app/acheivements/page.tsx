import React from "react";
import Timeline from "@/components/Timeline";
import Header from "@/components/Header";
const customItems = [
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  {
    id: 1,
    date: "يناير 2023",
    title: "إطلاق المشروع",
    description: "بداية مشروع جديد مع فريق العمل.",
  },
  // More items...
];
export default function page() {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#1F682C] to-[#164B20] min-h-[70vh] flex flex-col">
        <Header />
        <p
          className="text-2xl text-white max-w-[50%] mx-auto text-center my-auto"
          dir="rtl"
        >
          نعتز برحلتنا التي بدأت بشغف وأثمرت عن مراحل متقدمة من التطوير
          والتأثير. نسير بخطى واثقة نحو تحقيق أهدافنا من خلال إنجازات نوعية تعكس
          التزامنا بالرؤية، وحرصنا على تمكين المجتمع بالمعرفة المالية.
        </p>
      </div>
      <Timeline
        initialItems={customItems}
        showForm={false}
        primaryColor="#1a5c2e"
        darkColor="#0f3b1d"
      />
    </div>
  );
}
