// "use client";
// import SectionTitle from "./SectionTitle";
// import ethmarlogoS from "../Assets/ethmarlogoS.svg";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { HamburgerMenu } from "./AnimatedHamburgerButton";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Add scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <div
//         className={`flex items-center justify-between w-full px-6 md:px-14 py-4 z-50 transition-all duration-300`}
//       >
//         {/* Navigation Links (Hidden on Small Screens) */}
//         <div className="hidden lg:flex md:hidden sm:hidden flex-row-reverse items-center justify-evenly w-[80%]">
//           <SectionTitle title="الرئيسية" path="/" scrolled={scrolled} />
//           <SectionTitle
//             title="النشرات المالية"
//             path="/blog"
//             scrolled={scrolled}
//           />
//           <SectionTitle
//             title="شركاء النجاح"
//             path="/partners"
//             scrolled={scrolled}
//           />
//           <SectionTitle title="الهيكلة" path="/structure" scrolled={scrolled} />
//         </div>

//         {/* Hamburger Menu (Shown on Small Screens) */}
//         <div className="lg:hidden md:block sm:block">
//           <HamburgerMenu
//             className={`text-7xl focus:outline-none transition-colors duration-300 ${
//               scrolled ? "text-black" : "text-white"
//             }`}
//             onClick={() => {
//               setOpen(!open);
//             }}
//           />
//         </div>

//         {/* Logo */}
//         <Link href="/">
//           <div className="transition-transform duration-300 hover:scale-105">
//             <img
//               src={ethmarlogoS.src}
//               className="w-[180px] md:w-[220px] h-auto"
//               alt="Ethmar Logo"
//               width={220}
//               height={150}
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Mobile Menu (Dropdown) with animation */}
//       <div
//         className={`flex flex-col text-center space-y-4 lg:hidden bg-white w-full py-4 shadow-md z-40 transition-all duration-300 transform ${
//           open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
//         }`}
//       >
//         <Link
//           href="/"
//           className=" w-full mx-auto hover:bg-gray-100 py-2 transition-colors duration-200"
//         >
//           الرئيسية
//         </Link>
//         <Link
//           href="/blog"
//           className=" w-full mx-auto hover:bg-gray-100 py-2 transition-colors duration-200"
//         >
//           النشرات المالية
//         </Link>
//         <Link
//           href="/partners"
//           className=" w-full mx-auto hover:bg-gray-100 py-2 transition-colors duration-200"
//         >
//           شركاء النجاح
//         </Link>
//         <Link
//           href="/structure"
//           className=" w-full mx-auto hover:bg-gray-100 py-2 transition-colors duration-200"
//         >
//           الهيكلة
//         </Link>
//       </div>

//       {/* No spacer needed as header is not fixed */}
//     </>
//   );
// }
"use client";
import SectionTitle from "./SectionTitle";
import ethmarlogoS from "../Assets/ethmarlogoS.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HamburgerMenu } from "./AnimatedHamburgerButton";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between w-full px-6 md:px-14 py-4 z-50 transition-all duration-300">
        {/* Navigation Links (Hidden on Small Screens) */}
        <div className="hidden lg:flex md:hidden sm:hidden flex-row-reverse items-center justify-evenly w-[80%]">
          <SectionTitle title="الرئيسية" path="/" />
          <SectionTitle title="النشرات المالية" path="/blog" />
          <SectionTitle title="شركاء النجاح" path="/partners" />
          <SectionTitle title="الهيكلة" path="/structure" />
        </div>

        {/* Hamburger Menu (Shown on Small Screens) */}
        <div className="lg:hidden md:block sm:block">
          <HamburgerMenu
            className="text-7xl focus:outline-none text-white"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>

        {/* Logo */}
        <Link href="/">
          <div>
            <img
              src={ethmarlogoS.src}
              className="w-[180px] md:w-[220px] h-auto"
              alt="Ethmar Logo"
              width={220}
              height={150}
            />
          </div>
        </Link>
      </div>

      {/* Mobile Menu (Dropdown) with enhanced animations */}
      <div
        className={`flex flex-col text-center space-y-0 lg:hidden bg-white w-full overflow-hidden shadow-md z-40 transition-all duration-500 ease-in-out ${
          open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 space-y-4">
          <Link
            href="/"
            className="block text-black w-full mx-auto hover:bg-gray-100 py-2 transition-all duration-300 transform hover:translate-x-2"
            style={{
              transitionDelay: open ? "150ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            الرئيسية
          </Link>
          <Link
            href="/blog"
            className="block text-black w-full mx-auto hover:bg-gray-100 py-2 transition-all duration-300 transform hover:translate-x-2"
            style={{
              transitionDelay: open ? "250ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            النشرات المالية
          </Link>
          <Link
            href="/partners"
            className="block text-black w-full mx-auto hover:bg-gray-100 py-2 transition-all duration-300 transform hover:translate-x-2"
            style={{
              transitionDelay: open ? "350ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            شركاء النجاح
          </Link>
          <Link
            href="/structure"
            className="block text-black w-full mx-auto hover:bg-gray-100 py-2 transition-all duration-300 transform hover:translate-x-2"
            style={{
              transitionDelay: open ? "450ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            الهيكلة
          </Link>
        </div>
      </div>

      {/* No spacer needed as header is not fixed */}
    </>
  );
}
