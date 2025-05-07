// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Header from "@/components/Header";
// import { Calendar, Trophy, Star, Award, Check, ArrowUp } from "lucide-react";
// import Footer from "@/components/Footer";
// import getAchievements from "@/Services/acheivementsAPI";
// import Loader from "@/components/Loader";
// import HeroSection from "@/components/HeroSection";
// export interface Achievement {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   image_url: string;
//   icon?: string;
// }

// // Format date function with Arabic locale
// const formatDate = (dateString: string) => {
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   return new Date(dateString).toLocaleDateString("ar-SA", options);
// };

// // Function to get icon component
// const getIconComponent = (iconName?: string, props = {}) => {
//   switch (iconName) {
//     case "Trophy":
//       return <Trophy className="w-6 h-6 text-amber-500" {...props} />;
//     case "Star":
//       return <Star className="w-6 h-6 text-amber-500" {...props} />;
//     case "Award":
//       return <Award className="w-6 h-6 text-amber-500" {...props} />;
//     case "Check":
//       return <Check className="w-6 h-6 text-green-500" {...props} />;
//     case "ArrowUp":
//       return <ArrowUp className="w-6 h-6 text-blue-500" {...props} />;
//     default:
//       return <Calendar className="w-6 h-6 text-blue-500" {...props} />;
//   }
// };

// export default function Page() {
//   // State to store fetched achievements
//   const [achievements, setAchievements] = useState<Achievement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Add a viewport meta tag for better mobile display
//   useEffect(() => {
//     // Check if there's an existing viewport meta tag
//     // let viewportMeta = document.querySelector('meta[name="viewport"]');
//     const viewportMeta = document.querySelector(
//       'meta[name="viewport"]'
//     ) as HTMLMetaElement | null;

//     // If not, create and append one
//     if (!viewportMeta) {
//       // viewportMeta = document.createElement("meta");
//       // viewportMeta.name = "viewport";
//       // viewportMeta.content =
//       //   "width=device-width, initial-scale=1, maximum-scale=1";
//       // document.head.appendChild(viewportMeta);
//       const newMeta = document.createElement("meta");
//       newMeta.name = "viewport";
//       newMeta.content = "width=device-width, initial-scale=1, maximum-scale=1";
//       document.head.appendChild(newMeta);
//     }

//     // Fetch achievements data
//     const fetchAchievements = async () => {
//       try {
//         setLoading(true);
//         const data = await getAchievements();
//         setAchievements(data || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch achievements:", err);
//         setError("Failed to load achievements. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchAchievements();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       {/* Hero section with enhanced gradient */}
//       <HeroSection
//         type="title"
//         title="مسيرة نجاحنا"
//         content="نعتز برحلتنا التي بدأت بشغف وأثمرت عن مراحل متقدمة من التطوير والتأثير. نسير بخطى واثقة نحو تحقيق أهدافنا من خلال إنجازات نوعية تعكس التزامنا بالرؤية، وحرصنا على تمكين المجتمع بالمعرفة المالية."
//       />
//       {/* Timeline section with loading states */}
//       {loading ? (
//         <div className="container mx-auto py-16 px-4 text-center">
//           <Loader />
//         </div>
//       ) : error ? (
//         <div className="container mx-auto py-16 px-4 text-center">
//           <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md mx-auto">
//             <p className="text-red-600 dark:text-red-400 font-arabic" dir="rtl">
//               {error}
//             </p>
//             <button
//               className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors font-arabic"
//               onClick={() => window.location.reload()}
//               dir="rtl"
//             >
//               إعادة المحاولة
//             </button>
//           </div>
//         </div>
//       ) : achievements.length === 0 ? (
//         <div className="container mx-auto py-16 px-4 text-center">
//           <p className="text-gray-600 dark:text-gray-300 font-arabic" dir="rtl">
//             لا توجد إنجازات للعرض حالياً.
//           </p>
//         </div>
//       ) : (
//         <Main achievements={achievements} />
//       )}

//       {/* Footer section */}
//       <Footer />
//     </div>
//   );
// }

// function Main({ achievements }: { achievements: Achievement[] }) {
//   const timelineRefs = useRef([]);

//   useEffect(() => {
//     // Wait a moment for elements to be fully rendered
//     setTimeout(() => {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               entry.target.classList.add("is-visible");
//             }
//           });
//         },
//         { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
//       );

//       // Add observer to timeline items
//       const timelineItems = document.querySelectorAll(".timeline-item");
//       timelineItems.forEach((item) => {
//         observer.observe(item);
//       });

//       return () => {
//         timelineItems.forEach((item) => {
//           observer.unobserve(item);
//         });
//       };
//     }, 100);
//   }, []);

//   return (
//     <main className="container mx-auto py-12 md:py-16 px-4 relative">
//       {/* Custom animations */}
//       <style jsx>{`
//         @keyframes fadeInRight {
//           from {
//             opacity: 0;
//             transform: translateX(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         @keyframes fadeInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         @keyframes scaleX {
//           from {
//             transform: scaleX(0);
//           }
//           to {
//             transform: scaleX(1);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px) translateX(-50%);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) translateX(-50%);
//           }
//         }

//         .timeline-item .animate-fadeInRight,
//         .timeline-item .animate-fadeInLeft,
//         .timeline-item .animate-fadeIn {
//           opacity: 0;
//           animation-duration: 1s;
//           animation-fill-mode: both;
//           animation-play-state: paused;
//         }

//         .timeline-item .animate-scaleX {
//           transform: scaleX(0);
//           animation-duration: 0.8s;
//           animation-fill-mode: both;
//           animation-play-state: paused;
//         }

//         .timeline-item.is-visible .animate-fadeInRight {
//           animation-name: fadeInRight;
//           animation-play-state: running;
//         }

//         .timeline-item.is-visible .animate-fadeInLeft {
//           animation-name: fadeInLeft;
//           animation-play-state: running;
//         }

//         .timeline-item.is-visible .animate-fadeIn {
//           animation-name: fadeIn;
//           animation-play-state: running;
//           animation-delay: 0.2s;
//         }

//         .timeline-item.is-visible .animate-scaleX {
//           animation-name: scaleX;
//           animation-play-state: running;
//           animation-delay: 0.5s;
//         }

//         /* Mobile animations */
//         @media (max-width: 768px) {
//           .timeline-item .timeline-content {
//             opacity: 0;
//             transform: translateY(20px);
//             transition: all 0.5s ease-out;
//           }

//           .timeline-item.is-visible .timeline-content {
//             opacity: 1;
//             transform: translateY(0);
//           }

//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           .timeline-item .mobile-node {
//             opacity: 0;
//             animation-duration: 0.8s;
//             animation-fill-mode: both;
//             animation-play-state: paused;
//           }

//           .timeline-item.is-visible .mobile-node {
//             animation-name: fadeInUp;
//             animation-play-state: running;
//           }
//         }
//       `}</style>

//       {/* Section heading */}
//       <div className="text-center mb-16">
//         <h2
//           className="text-3xl font-bold mb-4"
//           dir="rtl"
//           style={{ fontFamily: "Tajawal, sans-serif", color: "#1F682C" }}
//         >
//           أبرز المحطات في مسيرتنا
//         </h2>
//         <div
//           className="w-24 h-1 mx-auto mt-4 rounded-full"
//           style={{ backgroundColor: "#2C953F" }}
//         ></div>
//       </div>
//       <div className="relative">
//         {/* Vertical line - visible only on medium screens and up */}
//         <div
//           className="absolute left-1/2 w-2 h-full transform -translate-x-1/2 hidden md:block rounded-full"
//           style={{
//             background: "linear-gradient(to bottom, #6BB579, #2C953F, #1F682C)",
//           }}
//         ></div>

//         {/* Mobile vertical line - visible only on small screens */}
//         <div
//           className="absolute left-1/2 w-1 h-full transform -translate-x-1/2 block md:hidden rounded-full"
//           style={{
//             background: "linear-gradient(to bottom, #6BB579, #2C953F, #1F682C)",
//           }}
//         ></div>

//         {/* The first timeline item starts visible by default for better UX */}
//         <div className="timeline-item is-visible mb-24 relative">
//           <div className="flex flex-col md:items-center">
//             {/* Timeline node with connecting line */}
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 animate-fadeIn">
//               {/* Animated circles */}
//               <div
//                 className="absolute -inset-12 rounded-full animate-pulse"
//                 style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
//               ></div>
//               <div
//                 className="absolute -inset-8 rounded-full animate-pulse"
//                 style={{
//                   backgroundColor: "rgba(44, 149, 63, 0.3)",
//                   animationDelay: "0.5s",
//                 }}
//               ></div>
//               {/* Main circle with icon */}
//               <div
//                 className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 z-10 transition-transform duration-300 hover:scale-110"
//                 style={{
//                   background: "linear-gradient(to right, #2C953F, #1F682C)",
//                 }}
//               >
//                 <div className="text-white">
//                   {getIconComponent(achievements[0].icon)}
//                 </div>
//               </div>
//               {/* Horizontal connecting line */}
//               <div
//                 className="absolute top-6 -left-32 w-32 h-1 animate-scaleX"
//                 style={{
//                   transformOrigin: "right center",
//                   background: "linear-gradient(to right, #2C953F, #6BB579)",
//                 }}
//               ></div>
//             </div>

//             {/* Mobile timeline node (only visible on small screens) */}
//             <div className="flex md:hidden justify-center mb-4 mobile-node">
//               <div className="relative">
//                 <div
//                   className="absolute -inset-4 rounded-full animate-pulse"
//                   style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
//                 ></div>
//                 <div
//                   className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
//                   style={{
//                     background: "linear-gradient(to right, #2C953F, #1F682C)",
//                   }}
//                 >
//                   <div className="text-white">
//                     {getIconComponent(achievements[0].icon, {
//                       size: 20,
//                       color: "white",
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Content layout */}
//             <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16 w-full">
//               {/* Content card */}
//               <div className="w-full md:w-1/2 animate-fadeInRight timeline-content">
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group max-w-md mx-auto w-full">
//                   <div className="relative h-48 sm:h-56 overflow-hidden">
//                     <img
//                       src={achievements[0].image_url}
//                       alt={achievements[0].title}
//                       className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
//                     {/* Year badge */}
//                     <div
//                       className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 shadow-lg"
//                       style={{ fontFamily: "Tajawal, sans-serif" }}
//                     >
//                       {new Date(achievements[0].date).getFullYear()}
//                     </div>
//                     {/* Icon badge */}
//                     <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 sm:p-2.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
//                       {getIconComponent(achievements[0].icon)}
//                     </div>
//                   </div>
//                   <div className="p-4 sm:p-6" dir="rtl">
//                     <h3
//                       className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
//                       style={{
//                         fontFamily: "Tajawal, sans-serif",
//                         color: "#1F682C",
//                       }}
//                     >
//                       {achievements[0].title}
//                     </h3>
//                     <p
//                       className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
//                       style={{ fontFamily: "Tajawal, sans-serif" }}
//                     >
//                       {achievements[0].description}
//                     </p>
//                     <div className="flex items-center mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 text-sm">
//                       <Calendar
//                         size={16}
//                         className="ml-2"
//                         style={{ color: "#2C953F" }}
//                       />
//                       <span
//                         style={{ fontFamily: "Tajawal, sans-serif" }}
//                         className="text-xs sm:text-sm"
//                       >
//                         {formatDate(achievements[0].date)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Empty space on the other side to maintain balance */}
//               <div className="w-full md:w-1/2"></div>
//             </div>
//           </div>
//         </div>

//         {/* Rest of the timeline items */}
//         {achievements.slice(1).map((achievement, index) => (
//           <div
//             key={achievement.id}
//             className="mb-24 last:mb-0 relative timeline-item"
//           >
//             <div className="flex flex-col md:items-center">
//               {/* Timeline node with connecting line */}
//               <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 animate-fadeIn">
//                 {/* Animated circles */}
//                 <div
//                   className="absolute -inset-12 rounded-full animate-pulse"
//                   style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
//                 ></div>
//                 <div
//                   className="absolute -inset-8 rounded-full animate-pulse"
//                   style={{
//                     backgroundColor: "rgba(44, 149, 63, 0.3)",
//                     animationDelay: "0.5s",
//                   }}
//                 ></div>
//                 {/* Main circle with icon */}
//                 <div
//                   className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 z-10 transition-transform duration-300 hover:scale-110"
//                   style={{
//                     background: "linear-gradient(to right, #2C953F, #1F682C)",
//                   }}
//                 >
//                   <div className="text-white">
//                     {getIconComponent(achievement.icon)}
//                   </div>
//                 </div>
//                 {/* Horizontal connecting line */}
//                 <div
//                   className={`absolute top-6 ${
//                     (index + 1) % 2 === 0 ? "-left-32" : "-right-32"
//                   } w-32 h-1 animate-scaleX`}
//                   style={{
//                     transformOrigin:
//                       (index + 1) % 2 === 0 ? "right center" : "left center",
//                     background:
//                       (index + 1) % 2 === 0
//                         ? "linear-gradient(to right, #2C953F, #6BB579)"
//                         : "linear-gradient(to left, #2C953F, #6BB579)",
//                   }}
//                 ></div>
//               </div>

//               {/* Mobile timeline node (only visible on small screens) */}
//               <div className="flex md:hidden justify-center mb-4 mobile-node">
//                 <div className="relative">
//                   <div
//                     className="absolute -inset-4 rounded-full animate-pulse"
//                     style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
//                   ></div>
//                   <div
//                     className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
//                     style={{
//                       background: "linear-gradient(to right, #2C953F, #1F682C)",
//                     }}
//                   >
//                     <div className="text-white">
//                       {getIconComponent(achievement.icon, {
//                         size: 20,
//                         color: "white",
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Content layout */}
//               <div
//                 className={`flex flex-col ${
//                   (index + 1) % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//                 } items-center gap-6 md:gap-16 w-full`}
//               >
//                 {/* Content card */}
//                 <div
//                   className={`w-full md:w-1/2 ${
//                     (index + 1) % 2 === 0
//                       ? "animate-fadeInRight"
//                       : "animate-fadeInLeft"
//                   } timeline-content`}
//                 >
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group max-w-md mx-auto w-full">
//                     <div className="relative h-48 sm:h-56 overflow-hidden">
//                       <img
//                         src={achievement.image_url}
//                         alt={achievement.title}
//                         className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
//                       {/* Year badge */}
//                       <div
//                         className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center min-w-[50px] text-center"
//                         style={{ fontFamily: "Tajawal, sans-serif" }}
//                       >
//                         {new Date(achievement.date).getFullYear()}
//                       </div>
//                       {/* Icon badge */}
//                       <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 sm:p-2.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
//                         {getIconComponent(achievement.icon)}
//                       </div>
//                     </div>
//                     <div className="p-4 sm:p-6" dir="rtl">
//                       <h3
//                         className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
//                         style={{
//                           fontFamily: "Tajawal, sans-serif",
//                           color: "#1F682C",
//                         }}
//                       >
//                         {achievement.title}
//                       </h3>
//                       <p
//                         className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
//                         style={{ fontFamily: "Tajawal, sans-serif" }}
//                       >
//                         {achievement.description}
//                       </p>
//                       <div className="flex items-center mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 text-sm">
//                         <Calendar
//                           size={16}
//                           className="ml-2"
//                           style={{ color: "#2C953F" }}
//                         />
//                         <span
//                           style={{ fontFamily: "Tajawal, sans-serif" }}
//                           className="text-xs sm:text-sm"
//                         >
//                           {formatDate(achievement.date)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Empty space on the other side to maintain balance */}
//                 <div className="w-full md:w-1/2"></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import { Calendar } from "lucide-react";
import Footer from "@/components/Footer";
import getAchievements from "@/Services/acheivementsAPI";
import Loader from "@/components/Loader";
import HeroSection from "@/components/HeroSection";
export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url: string;
}

// Format date function with Arabic locale
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ar-SA", options);
};

export default function Page() {
  // State to store fetched achievements
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add a viewport meta tag for better mobile display
  useEffect(() => {
    // Check if there's an existing viewport meta tag
    const viewportMeta = document.querySelector(
      'meta[name="viewport"]'
    ) as HTMLMetaElement | null;

    // If not, create and append one
    if (!viewportMeta) {
      const newMeta = document.createElement("meta");
      newMeta.name = "viewport";
      newMeta.content = "width=device-width, initial-scale=1, maximum-scale=1";
      document.head.appendChild(newMeta);
    }

    // Fetch achievements data
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const data = await getAchievements();
        setAchievements(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
        setError("Failed to load achievements. Please try again later.");
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero section with enhanced gradient */}
      <HeroSection
        type="title"
        title="مسيرة نجاحنا"
        content="نعتز برحلتنا التي بدأت بشغف وأثمرت عن مراحل متقدمة من التطوير والتأثير. نسير بخطى واثقة نحو تحقيق أهدافنا من خلال إنجازات نوعية تعكس التزامنا بالرؤية، وحرصنا على تمكين المجتمع بالمعرفة المالية."
      />
      {/* Timeline section with loading states */}
      {loading ? (
        <div className="container mx-auto py-16 px-4 text-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md mx-auto">
            <p className="text-red-600 dark:text-red-400 font-arabic" dir="rtl">
              {error}
            </p>
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors font-arabic"
              onClick={() => window.location.reload()}
              dir="rtl"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      ) : achievements.length === 0 ? (
        <div className="container mx-auto py-16 px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 font-arabic" dir="rtl">
            لا توجد إنجازات للعرض حالياً.
          </p>
        </div>
      ) : (
        <Main achievements={achievements} />
      )}

      {/* Footer section */}
      <Footer />
    </div>
  );
}

function Main({ achievements }: { achievements: Achievement[] }) {
  const timelineRefs = useRef([]);

  useEffect(() => {
    // Wait a moment for elements to be fully rendered
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      );

      // Add observer to timeline items
      const timelineItems = document.querySelectorAll(".timeline-item");
      timelineItems.forEach((item) => {
        observer.observe(item);
      });

      return () => {
        timelineItems.forEach((item) => {
          observer.unobserve(item);
        });
      };
    }, 100);
  }, []);

  return (
    <main className="container mx-auto py-12 md:py-16 px-4 relative">
      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleX {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }

        .timeline-item .animate-fadeInRight,
        .timeline-item .animate-fadeInLeft,
        .timeline-item .animate-fadeIn {
          opacity: 0;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-play-state: paused;
        }

        .timeline-item .animate-scaleX {
          transform: scaleX(0);
          animation-duration: 0.8s;
          animation-fill-mode: both;
          animation-play-state: paused;
        }

        .timeline-item.is-visible .animate-fadeInRight {
          animation-name: fadeInRight;
          animation-play-state: running;
        }

        .timeline-item.is-visible .animate-fadeInLeft {
          animation-name: fadeInLeft;
          animation-play-state: running;
        }

        .timeline-item.is-visible .animate-fadeIn {
          animation-name: fadeIn;
          animation-play-state: running;
          animation-delay: 0.2s;
        }

        .timeline-item.is-visible .animate-scaleX {
          animation-name: scaleX;
          animation-play-state: running;
          animation-delay: 0.5s;
        }

        /* Mobile animations */
        @media (max-width: 768px) {
          .timeline-item .timeline-content {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease-out;
          }

          .timeline-item.is-visible .timeline-content {
            opacity: 1;
            transform: translateY(0);
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .timeline-item .mobile-node {
            opacity: 0;
            animation-duration: 0.8s;
            animation-fill-mode: both;
            animation-play-state: paused;
          }

          .timeline-item.is-visible .mobile-node {
            animation-name: fadeInUp;
            animation-play-state: running;
          }
        }
      `}</style>

      {/* Section heading */}
      <div className="text-center mb-16">
        <h2
          className="text-3xl font-bold mb-4"
          dir="rtl"
          style={{ fontFamily: "Tajawal, sans-serif", color: "#1F682C" }}
        >
          أبرز المحطات في مسيرتنا
        </h2>
        <div
          className="w-24 h-1 mx-auto mt-4 rounded-full"
          style={{ backgroundColor: "#2C953F" }}
        ></div>
      </div>
      <div className="relative">
        {/* Vertical line - visible only on medium screens and up */}
        <div
          className="absolute left-1/2 w-2 h-full transform -translate-x-1/2 hidden md:block rounded-full"
          style={{
            background: "linear-gradient(to bottom, #6BB579, #2C953F, #1F682C)",
          }}
        ></div>

        {/* Mobile vertical line - visible only on small screens */}
        <div
          className="absolute left-1/2 w-1 h-full transform -translate-x-1/2 block md:hidden rounded-full"
          style={{
            background: "linear-gradient(to bottom, #6BB579, #2C953F, #1F682C)",
          }}
        ></div>

        {/* The first timeline item starts visible by default for better UX */}
        <div className="timeline-item is-visible mb-24 relative">
          <div className="flex flex-col md:items-center">
            {/* Timeline node with connecting line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 animate-fadeIn">
              {/* Animated circles */}
              <div
                className="absolute -inset-12 rounded-full animate-pulse"
                style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
              ></div>
              <div
                className="absolute -inset-8 rounded-full animate-pulse"
                style={{
                  backgroundColor: "rgba(44, 149, 63, 0.3)",
                  animationDelay: "0.5s",
                }}
              ></div>
              {/* Main circle */}
              <div
                className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 z-10 transition-transform duration-300 hover:scale-110"
                style={{
                  background: "linear-gradient(to right, #2C953F, #1F682C)",
                }}
              ></div>
              {/* Horizontal connecting line */}
              <div
                className="absolute top-6 -left-32 w-32 h-1 animate-scaleX"
                style={{
                  transformOrigin: "right center",
                  background: "linear-gradient(to right, #2C953F, #6BB579)",
                }}
              ></div>
            </div>

            {/* Mobile timeline node (only visible on small screens) */}
            <div className="flex md:hidden justify-center mb-4 mobile-node">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-full animate-pulse"
                  style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
                ></div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(to right, #2C953F, #1F682C)",
                  }}
                ></div>
              </div>
            </div>

            {/* Content layout */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16 w-full">
              {/* Content card */}
              <div className="w-full md:w-1/2 animate-fadeInRight timeline-content">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group max-w-md mx-auto w-full">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={achievements[0].image_url}
                      alt={achievements[0].title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                    {/* Year badge */}
                    <div
                      className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 shadow-lg"
                      style={{ fontFamily: "Tajawal, sans-serif" }}
                    >
                      {new Date(achievements[0].date).getFullYear()}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6" dir="rtl">
                    <h3
                      className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                      style={{
                        fontFamily: "Tajawal, sans-serif",
                        color: "#1F682C",
                      }}
                    >
                      {achievements[0].title}
                    </h3>
                    <p
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
                      style={{ fontFamily: "Tajawal, sans-serif" }}
                    >
                      {achievements[0].description}
                    </p>
                    <div className="flex items-center mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar
                        size={16}
                        className="ml-2"
                        style={{ color: "#2C953F" }}
                      />
                      <span
                        style={{ fontFamily: "Tajawal, sans-serif" }}
                        className="text-xs sm:text-sm"
                      >
                        {formatDate(achievements[0].date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Empty space on the other side to maintain balance */}
              <div className="w-full md:w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Rest of the timeline items */}
        {achievements.slice(1).map((achievement, index) => (
          <div
            key={achievement.id}
            className="mb-24 last:mb-0 relative timeline-item"
          >
            <div className="flex flex-col md:items-center">
              {/* Timeline node with connecting line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 animate-fadeIn">
                {/* Animated circles */}
                <div
                  className="absolute -inset-12 rounded-full animate-pulse"
                  style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
                ></div>
                <div
                  className="absolute -inset-8 rounded-full animate-pulse"
                  style={{
                    backgroundColor: "rgba(44, 149, 63, 0.3)",
                    animationDelay: "0.5s",
                  }}
                ></div>
                {/* Main circle */}
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 z-10 transition-transform duration-300 hover:scale-110"
                  style={{
                    background: "linear-gradient(to right, #2C953F, #1F682C)",
                  }}
                ></div>
                {/* Horizontal connecting line */}
                <div
                  className={`absolute top-6 ${
                    (index + 1) % 2 === 0 ? "-left-32" : "-right-32"
                  } w-32 h-1 animate-scaleX`}
                  style={{
                    transformOrigin:
                      (index + 1) % 2 === 0 ? "right center" : "left center",
                    background:
                      (index + 1) % 2 === 0
                        ? "linear-gradient(to right, #2C953F, #6BB579)"
                        : "linear-gradient(to left, #2C953F, #6BB579)",
                  }}
                ></div>
              </div>

              {/* Mobile timeline node (only visible on small screens) */}
              <div className="flex md:hidden justify-center mb-4 mobile-node">
                <div className="relative">
                  <div
                    className="absolute -inset-4 rounded-full animate-pulse"
                    style={{ backgroundColor: "rgba(107, 181, 121, 0.2)" }}
                  ></div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(to right, #2C953F, #1F682C)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Content layout */}
              <div
                className={`flex flex-col ${
                  (index + 1) % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-6 md:gap-16 w-full`}
              >
                {/* Content card */}
                <div
                  className={`w-full md:w-1/2 ${
                    (index + 1) % 2 === 0
                      ? "animate-fadeInRight"
                      : "animate-fadeInLeft"
                  } timeline-content`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group max-w-md mx-auto w-full">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={achievement.image_url}
                        alt={achievement.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                      {/* Year badge */}
                      <div
                        className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center min-w-[50px] text-center"
                        style={{ fontFamily: "Tajawal, sans-serif" }}
                      >
                        {new Date(achievement.date).getFullYear()}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6" dir="rtl">
                      <h3
                        className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                        style={{
                          fontFamily: "Tajawal, sans-serif",
                          color: "#1F682C",
                        }}
                      >
                        {achievement.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
                        style={{ fontFamily: "Tajawal, sans-serif" }}
                      >
                        {achievement.description}
                      </p>
                      <div className="flex items-center mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar
                          size={16}
                          className="ml-2"
                          style={{ color: "#2C953F" }}
                        />
                        <span
                          style={{ fontFamily: "Tajawal, sans-serif" }}
                          className="text-xs sm:text-sm"
                        >
                          {formatDate(achievement.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Empty space on the other side to maintain balance */}
                <div className="w-full md:w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
