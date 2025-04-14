// "use client";
// import React, { useState, useEffect, useRef } from "react";
// // Define TypeScript interfaces
// interface TimelineItem {
//   id: number;
//   date: string;
//   title: string;
//   description: string;
//   image?: string; // Optional image URL for each card
// }
// interface TimelineProps {
//   initialItems?: TimelineItem[];
//   primaryColor?: string;
//   darkColor?: string;
//   darkerColor?: string;
//   lightColor?: string;
//   grayColor?: string;
//   whiteColor?: string;
// }
// const Timeline: React.FC<TimelineProps> = ({
//   initialItems,
//   primaryColor = "#2C953F",
//   darkColor = "#1F682C",
//   darkerColor = "#164B20",
//   lightColor = "#6BB579",
//   grayColor = "#E4E4E4",
//   whiteColor = "#FFFFFF",
// }) => {
//   // Create theme object from props
//   const theme = {
//     primary: primaryColor,
//     dark: darkColor,
//     darker: darkerColor,
//     light: lightColor,
//     gray: grayColor,
//     white: whiteColor,
//   };
//   // Default timeline data with proper type
//   const defaultTimelineData = [
//     {
//       id: 1,
//       date: "مارس 2020",
//       title: "مرحلة البحث",
//       description:
//         "بحث سوق مكثف وتحليل للمنافسة. تحديد الجمهور المستهدف والميزات الرئيسية.",
//       image: "/ethmarlogoP.svg",
//     },
//     {
//       id: 2,
//       date: "يونيو 2020",
//       title: "مرحلة التصميم",
//       description:
//         "تصميم واجهة المستخدم والنماذج الأولية. اختبار المستخدم والتحسينات المتكررة بناءً على التعليقات.",
//       image: "/ethmarlogoP.svg",
//     },
//     {
//       id: 3,
//       date: "سبتمبر 2020",
//       title: "مرحلة التطوير",
//       description:
//         "البرمجة وتنفيذ الميزات الأساسية. إعداد البنية التحتية والخلفية وتصميم قاعدة البيانات.",
//       image: "/ethmarlogoP.svg",
//     },
//     {
//       id: 4,
//       date: "ديسمبر 2020",
//       title: "مرحلة الاختبار",
//       description: "ضمان الجودة والاختبار الدقيق. إصلاح الأخطاء وتحسين الأداء.",
//       image: "/ethmarlogoP.svg",
//     },
//     {
//       id: 5,
//       date: "مارس 2021",
//       title: "مرحلة الإطلاق",
//       description:
//         "إطلاق المنتج الرسمي. حملات التسويق واستراتيجيات اكتساب المستخدمين.",
//       image: "/ethmarlogoP.svg",
//     },
//   ];
//   // Use initialItems if provided, otherwise use default
//   const [timelineData, setTimelineData] = useState<TimelineItem[]>(
//     initialItems || defaultTimelineData
//   );

//   // Handle intersection observer for animations
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
//   // Initialize timeline items refs array
//   useEffect(() => {
//     // Reset the refs array when timeline data changes
//     timelineItemsRef.current = timelineItemsRef.current.slice(
//       0,
//       timelineData.length
//     );
//   }, [timelineData]);
//   useEffect(() => {
//     // Create the observer with a longer delay for each item
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry, index) => {
//           if (entry.isIntersecting) {
//             // Stagger the animations with longer delays
//             setTimeout(() => {
//               entry.target.classList.add("fade-in");
//             }, index * 800); // Longer 800ms delay between items
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
//     );
//     // Connect the observer to DOM elements
//     timelineItemsRef.current.forEach((item) => {
//       if (item) {
//         observerRef.current?.observe(item);
//       }
//     });
//     // Cleanup the observer on unmount
//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [timelineData]);
//   // Force the initial load of animations with sequential timing
//   useEffect(() => {
//     // Trigger animation for timeline items with staggered timing
//     const items = document.querySelectorAll(".timeline-item");
//     items.forEach((item, index) => {
//       setTimeout(
//         () => {
//           item.classList.add("fade-in");
//         },
//         1000 + index * 800
//       ); // Initial delay plus staggered timing
//     });
//   }, []);
//   return (
//     <div
//       dir="rtl"
//       className="flex flex-col items-center w-full max-w-5xl mx-auto p-6"
//       style={{ fontFamily: "Tajawal, Arial, sans-serif" }}
//     >
//       {/* Timeline container */}
//       <div className="relative w-full" style={{ minHeight: "600px" }}>
//         {/* Vertical timeline line - using gradient for more polish */}
//         <div
//           className="absolute right-1/2 transform translate-x-1/2 w-1"
//           style={{
//             background: `linear-gradient(to bottom, ${theme.light}, ${theme.primary}, ${theme.dark})`,
//             top: "0",
//             height: timelineData.length > 0 ? "100%" : "600px",
//             boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
//           }}
//         ></div>
//         {/* Timeline items */}
//         {timelineData.map((item, index) => (
//           <div
//             key={item.id}
//             ref={(el: HTMLDivElement | null) => {
//               timelineItemsRef.current[index] = el;
//             }}
//             className="relative mb-32 opacity-0 translate-y-8 transition-all duration-1500 ease-out transform timeline-item"
//             style={{
//               opacity: 0,
//               transform: "translateY(40px)", // Start further below for more dramatic effect
//             }}
//           >
//             {/* Timeline dot - simple clean circle */}
//             <div
//               className="absolute right-1/2 transform translate-x-1/2 w-8 h-8 rounded-full z-10 mt-28"
//               style={{
//                 backgroundColor: theme.primary,
//                 boxShadow: `0 0 0 4px rgba(44, 149, 63, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)`,
//                 transition: "all 0.3s ease",
//               }}
//             ></div>
//             {/* Content box - adjust for RTL layout */}
//             <div
//               className={`relative ${
//                 index % 2 === 0 ? "ml-auto" : "mr-auto"
//               } w-5/12 bg-white rounded-lg flex`}
//               style={{
//                 borderRight:
//                   index % 2 === 0 ? `4px solid ${theme.primary}` : "none",
//                 borderLeft:
//                   index % 2 !== 0 ? `4px solid ${theme.primary}` : "none",
//                 boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)`,
//                 transform: "translateY(0)",
//                 transition: "all 0.3s ease",
//                 minHeight: "280px", // Increased minimum height
//                 maxHeight: "340px", // Increased maximum height
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "translateY(-5px)";
//                 e.currentTarget.style.boxShadow = `0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.04)`;
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)`;
//               }}
//             >
//               {/* Content on the right side (swapped) */}
//               <div className="w-3/5 p-8">
//                 <div
//                   className="font-semibold mb-2 text-right"
//                   style={{ color: theme.primary }}
//                 >
//                   {item.date}
//                 </div>
//                 <h3
//                   className="text-xl font-bold mb-3 text-right"
//                   style={{ color: theme.dark }}
//                 >
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 text-right">{item.description}</p>
//               </div>
//               {/* Image on the left side (swapped) */}
//               <div
//                 className="w-2/5 flex justify-center items-center border-r p-4"
//                 style={{ borderColor: theme.gray }}
//               >
//                 <div className="w-full h-full flex justify-center items-center">
//                   <img
//                     src={item.image || "/ethmarlogoP.svg"}
//                     alt={`${item.title} image`}
//                     className="h-40 max-w-full object-contain"
//                     onError={(e) => {
//                       // Fallback if image fails to load
//                       const target = e.target as HTMLImageElement;
//                       target.src = "/ethmarlogoP.svg";
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Add custom CSS for animations */}
//       <style jsx global>{`
//         .fade-in {
//           opacity: 1 !important;
//           transform: translateY(0) !important;
//           transition:
//             opacity 1.2s ease-out,
//             transform 1.2s ease-out;
//         }
//         /* Ensure the timeline is visible on initial load */
//         .timeline-item {
//           margin-bottom: 8rem;
//         }
//         @font-face {
//           font-family: "Tajawal";
//           src: url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap");
//         }
//       `}</style>
//     </div>
//   );
// };
// // For mobile responsiveness
// const TimelineWrapper: React.FC<TimelineProps> = (props) => {
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   useEffect(() => {
//     const checkMobile = (): void => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);
//   if (isMobile) {
//     return (
//       <div className="block w-full">
//         <Timeline {...props} />
//         <style jsx global>{`
//           @media (max-width: 768px) {
//             .timeline-item > div:not(.absolute) {
//               width: calc(100% - 30px) !important;
//               margin-right: 30px !important;
//               margin-left: 0 !important;
//               flex-direction: column-reverse !important; /* Stack content on top of image */
//               min-height: 320px !important;
//               max-height: none !important;
//             }
//             .timeline-item > div > div:first-child {
//               width: 100% !important;
//               padding-bottom: 0 !important;
//             }
//             .timeline-item > div > div:last-child {
//               width: 100% !important;
//               border-right: none !important;
//               border-bottom: 1px solid #e4e4e4 !important;
//               padding-top: 12px !important;
//               padding-bottom: 12px !important;
//               margin-bottom: 12px !important;
//             }
//             .absolute.right-1/2 {
//               right: 30px !important;
//               transform: none !important;
//             }
//             .absolute.right-1/2.transform.translate-x-1\/2.w-1 {
//               right: 30px !important;
//             }
//             .absolute.right-1/2.transform.translate-x-1\/2.w-8 {
//               right: 30px !important;
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }
//   return <Timeline {...props} />;
// };
// export default TimelineWrapper;
"use client";
import React, { useState, useEffect, useRef } from "react";
import getAchievements from "../Services/acheivementsAPI";
import Loader from "./Loader";
// No need for the Supabase client import anymore

// Define TypeScript interfaces
interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string; // Optional image URL for each card
}

interface TimelineProps {
  primaryColor?: string;
  darkColor?: string;
  darkerColor?: string;
  lightColor?: string;
  grayColor?: string;
  whiteColor?: string;
}

const Timeline: React.FC<TimelineProps> = ({
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

  // State for timeline data
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Default timeline data as fallback
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

  // Import and use your getAchievements function

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);

      try {
        const data = await getAchievements();

        if (data && data.length > 0) {
          // Map data to TimelineItem format if needed
          const formattedData = data.map((item) => ({
            id: item.id,
            date: item.date,
            title: item.title,
            description: item.description,
            image: item.image || "/ethmarlogoP.svg",
          }));

          // Sort by date from oldest to newest
          const sortedData = formattedData.sort((a, b) => {
            // Convert dates to timestamps for comparison
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB; // Ascending order (oldest first)
          });

          setTimelineData(sortedData);
        } else {
          // If no data returned, use default
          setTimelineData(defaultTimelineData);
        }
      } catch (err) {
        console.error("Error in fetch operation:", err);
        setError("An error occurred while loading timeline data");
        setTimelineData(defaultTimelineData); // Use default data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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

  // Show loading state
  if (loading && timelineData.length === 0) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col items-center w-full max-w-5xl mx-auto p-6"
      style={{ fontFamily: "Tajawal, Arial, sans-serif" }}
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 w-full text-center">
          {error}
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
            key={item.id}
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
