"use client";
import React, { useState, useEffect, useRef } from "react";
// Define TypeScript interfaces
interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string; // Optional image URL for each card
}
interface NewTimelineItem {
  date: string;
  title: string;
  description: string;
  image: string;
}
interface TimelineProps {
  initialItems?: TimelineItem[];
  showForm?: boolean;
  primaryColor?: string;
  darkColor?: string;
  darkerColor?: string;
  lightColor?: string;
  grayColor?: string;
  whiteColor?: string;
}
const Timeline: React.FC<TimelineProps> = ({
  initialItems,
  showForm = true,
  primaryColor = "#2C953F",
  darkColor = "#1F682C",
  darkerColor = "#164B20",
  lightColor = "#6BB579",
  grayColor = "#E4E4E4",
  whiteColor = "#FFFFFF",
}) => {
  // Create theme object from props
  const theme = {
    primary: primaryColor,
    dark: darkColor,
    darker: darkerColor,
    light: lightColor,
    gray: grayColor,
    white: whiteColor,
  };
  // Default timeline data with proper type
  const defaultTimelineData = [
    {
      id: 1,
      date: "مارس 2020",
      title: "مرحلة البحث",
      description:
        "بحث سوق مكثف وتحليل للمنافسة. تحديد الجمهور المستهدف والميزات الرئيسية.",
      image: "/ethmarlogoP.svg",
    },
    {
      id: 2,
      date: "يونيو 2020",
      title: "مرحلة التصميم",
      description:
        "تصميم واجهة المستخدم والنماذج الأولية. اختبار المستخدم والتحسينات المتكررة بناءً على التعليقات.",
      image: "/ethmarlogoP.svg",
    },
    {
      id: 3,
      date: "سبتمبر 2020",
      title: "مرحلة التطوير",
      description:
        "البرمجة وتنفيذ الميزات الأساسية. إعداد البنية التحتية والخلفية وتصميم قاعدة البيانات.",
      image: "/ethmarlogoP.svg",
    },
    {
      id: 4,
      date: "ديسمبر 2020",
      title: "مرحلة الاختبار",
      description: "ضمان الجودة والاختبار الدقيق. إصلاح الأخطاء وتحسين الأداء.",
      image: "/ethmarlogoP.svg",
    },
    {
      id: 5,
      date: "مارس 2021",
      title: "مرحلة الإطلاق",
      description:
        "إطلاق المنتج الرسمي. حملات التسويق واستراتيجيات اكتساب المستخدمين.",
      image: "/ethmarlogoP.svg",
    },
  ];
  // Use initialItems if provided, otherwise use default
  const [timelineData, setTimelineData] =
    useState<TimelineItem[]>(defaultTimelineData);
  // Add a new timeline item - with proper type
  const [newItem, setNewItem] = useState<NewTimelineItem>({
    date: "",
    title: "",
    description: "",
    image: "/ethmarlogoP.svg",
  });
  // Handle form input changes with TypeScript event types
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Add new timeline item
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newItem.date && newItem.title && newItem.description) {
      // Generate a unique ID based on timestamp
      const newId = Date.now();
      setTimelineData((prev) => [
        ...prev,
        {
          id: newId,
          ...newItem,
        },
      ]);
      // Reset form
      setNewItem({
        date: "",
        title: "",
        description: "",
        image: "/ethmarlogoP.svg",
      });
    }
  };
  // Handle intersection observer for animations
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  // Initialize timeline items refs array
  useEffect(() => {
    // Reset the refs array when timeline data changes
    timelineItemsRef.current = timelineItemsRef.current.slice(
      0,
      timelineData.length
    );
  }, [timelineData]);
  useEffect(() => {
    // Create the observer with a longer delay for each item
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger the animations with longer delays
            setTimeout(() => {
              entry.target.classList.add("fade-in");
            }, index * 800); // Longer 800ms delay between items
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    // Connect the observer to DOM elements
    timelineItemsRef.current.forEach((item) => {
      if (item) {
        observerRef.current?.observe(item);
      }
    });
    // Cleanup the observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [timelineData]);
  // Force the initial load of animations with sequential timing
  useEffect(() => {
    // Trigger animation for timeline items with staggered timing
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item, index) => {
      setTimeout(
        () => {
          item.classList.add("fade-in");
        },
        1000 + index * 800
      ); // Initial delay plus staggered timing
    });
  }, []);
  return (
    <div
      dir="rtl"
      className="flex flex-col items-center w-full max-w-5xl mx-auto p-6"
      style={{ fontFamily: "Tajawal, Arial, sans-serif" }}
    >
      {/* Add new timeline item form - Only show if showForm is true */}
      {showForm && (
        <div
          className="w-full max-w-md mb-16 p-6 bg-white rounded-lg shadow-lg"
          style={{
            borderTop: `4px solid ${theme.primary}`,
            boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)`,
          }}
        >
          <h2
            className="text-xl font-bold mb-6 text-right"
            style={{ color: theme.dark }}
          >
            إضافة حدث جديد للجدول الزمني
          </h2>
          <form onSubmit={handleAddItem}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2 text-right"
                style={{ color: theme.dark }}
              >
                التاريخ
              </label>
              <input
                type="text"
                name="date"
                value={newItem.date}
                onChange={handleInputChange}
                placeholder="مثال: يونيو 2021"
                className="w-full p-3 border rounded-md text-right focus:outline-none focus:ring-2"
                style={{
                  borderColor: theme.gray,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.2s ease",
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2 text-right"
                style={{ color: theme.dark }}
              >
                العنوان
              </label>
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleInputChange}
                placeholder="عنوان المرحلة"
                className="w-full p-3 border rounded-md text-right focus:outline-none focus:ring-2"
                style={{
                  borderColor: theme.gray,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.2s ease",
                }}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2 text-right"
                style={{ color: theme.dark }}
              >
                الوصف
              </label>
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                placeholder="وصف الحدث"
                className="w-full p-3 border rounded-md text-right focus:outline-none focus:ring-2"
                style={{
                  borderColor: theme.gray,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.2s ease",
                  minHeight: "100px",
                }}
                rows={3}
                required
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="py-3 px-6 rounded-md text-white transition-all duration-300 font-medium"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 4px 6px -1px rgba(44, 149, 63, 0.2), 0 2px 4px -1px rgba(44, 149, 63, 0.1)`,
                  transform: "translateY(0)",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.dark;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 6px 10px -1px rgba(44, 149, 63, 0.2), 0 4px 6px -1px rgba(44, 149, 63, 0.1)`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 6px -1px rgba(44, 149, 63, 0.2), 0 2px 4px -1px rgba(44, 149, 63, 0.1)`;
                }}
              >
                إضافة إلى الجدول الزمني
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Timeline container */}
      <div className="relative w-full" style={{ minHeight: "600px" }}>
        {/* Vertical timeline line - using gradient for more polish */}
        <div
          className="absolute right-1/2 transform translate-x-1/2 w-1"
          style={{
            background: `linear-gradient(to bottom, ${theme.light}, ${theme.primary}, ${theme.dark})`,
            top: "0",
            height: timelineData.length > 0 ? "100%" : "600px",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
          }}
        ></div>
        {/* Timeline items */}
        {timelineData.map((item, index) => (
          <div
            key={item.id} // Fixed: Use just the ID as key
            ref={(el: HTMLDivElement | null) => {
              timelineItemsRef.current[index] = el;
            }}
            className="relative mb-32 opacity-0 translate-y-8 transition-all duration-1500 ease-out transform timeline-item"
            style={{
              opacity: 0,
              transform: "translateY(40px)", // Start further below for more dramatic effect
            }}
          >
            {/* Timeline dot - simple clean circle */}
            <div
              className="absolute right-1/2 transform translate-x-1/2 w-8 h-8 rounded-full z-10 mt-28"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 0 4px rgba(44, 149, 63, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)`,
                transition: "all 0.3s ease",
              }}
            ></div>
            {/* Content box - adjust for RTL layout */}
            <div
              className={`relative ${
                index % 2 === 0 ? "ml-auto" : "mr-auto"
              } w-5/12 bg-white rounded-lg flex`}
              style={{
                borderRight:
                  index % 2 === 0 ? `4px solid ${theme.primary}` : "none",
                borderLeft:
                  index % 2 !== 0 ? `4px solid ${theme.primary}` : "none",
                boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)`,
                transform: "translateY(0)",
                transition: "all 0.3s ease",
                minHeight: "280px", // Increased minimum height
                maxHeight: "340px", // Increased maximum height
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = `0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.04)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)`;
              }}
            >
              {/* Content on the right side (swapped) */}
              <div className="w-3/5 p-8">
                <div
                  className="font-semibold mb-2 text-right"
                  style={{ color: theme.primary }}
                >
                  {item.date}
                </div>
                <h3
                  className="text-xl font-bold mb-3 text-right"
                  style={{ color: theme.dark }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-right">{item.description}</p>
              </div>
              {/* Image on the left side (swapped) */}
              <div
                className="w-2/5 flex justify-center items-center border-r p-4"
                style={{ borderColor: theme.gray }}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={item.image || "/ethmarlogoP.svg"}
                    alt={`${item.title} image`}
                    className="h-40 max-w-full object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = "/ethmarlogoP.svg";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add custom CSS for animations */}
      <style jsx global>{`
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition:
            opacity 1.2s ease-out,
            transform 1.2s ease-out;
        }
        /* Ensure the timeline is visible on initial load */
        .timeline-item {
          margin-bottom: 8rem;
        }
        @font-face {
          font-family: "Tajawal";
          src: url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap");
        }
      `}</style>
    </div>
  );
};
// For mobile responsiveness
const TimelineWrapper: React.FC<TimelineProps> = (props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  if (isMobile) {
    return (
      <div className="block w-full">
        <Timeline {...props} />
        <style jsx global>{`
          @media (max-width: 768px) {
            .timeline-item > div:not(.absolute) {
              width: calc(100% - 30px) !important;
              margin-right: 30px !important;
              margin-left: 0 !important;
              flex-direction: column-reverse !important; /* Stack content on top of image */
              min-height: 320px !important;
              max-height: none !important;
            }
            .timeline-item > div > div:first-child {
              width: 100% !important;
              padding-bottom: 0 !important;
            }
            .timeline-item > div > div:last-child {
              width: 100% !important;
              border-right: none !important;
              border-bottom: 1px solid #e4e4e4 !important;
              padding-top: 12px !important;
              padding-bottom: 12px !important;
              margin-bottom: 12px !important;
            }
            .absolute.right-1/2 {
              right: 30px !important;
              transform: none !important;
            }
            .absolute.right-1/2.transform.translate-x-1\/2.w-1 {
              right: 30px !important;
            }
            .absolute.right-1/2.transform.translate-x-1\/2.w-8 {
              right: 30px !important;
            }
          }
        `}</style>
      </div>
    );
  }
  return <Timeline {...props} />;
};
export default TimelineWrapper;
