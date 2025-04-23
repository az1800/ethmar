"use client";
import SectionTitle from "./SectionTitle";
import ethmarlogoS from "../Assets/ethmarlogoS.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HamburgerMenu } from "./AnimatedHamburgerButton";
import { useUser } from "@/authentication/useUser";
import { useLogout } from "@/authentication/useLogout";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useUser();
  const { logout, isLoading: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className=" flex items-center justify-between w-full px-6  md:px-14 py-4 z-50 transition-all duration-300 ">
        {/* Navigation Links (Hidden on Small Screens) */}
        <div className="hidden lg:flex md:hidden sm:hidden flex-row-reverse items-center justify-evenly w-[80%]">
          <SectionTitle title="الرئيسية" path="/" />
          <SectionTitle title="النشرات المالية" path="/blog" />
          <SectionTitle title="شركاء النجاح" path="/partners" />
          <SectionTitle title="الهيكلة" path="/structure" />
          <SectionTitle title="إنجازاتنا" path="/acheivements" />
          {isAuthenticated && (
            <SectionTitle title="لوحة التحكم" path="/adminDashboard" />
          )}

          {/* Conditional Login/Logout Button */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-white text-[#1F682C] font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
              style={{
                boxShadow: "0 4px 6px rgba(31, 104, 44, 0.2)",
              }}
            >
              {isLoggingOut ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
            </button>
          ) : (
            <Link href="/login">
              <button
                className="bg-white text-green-900 font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
                style={{
                  boxShadow: "0 4px 6px rgba(31, 104, 44, 0.2)",
                }}
              >
                تسجيل الدخول
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger Menu (Shown on Small Screens) */}
        <div className="lg:hidden md:block sm:block">
          <HamburgerMenu
            className="relative text-7xl focus:outline-none text-white "
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
              width={180}
              height={120}
            />
          </div>
        </Link>
      </div>

      {/* Mobile Menu (Dropdown) with enhanced animations */}
      <div
        className={`flex flex-col text-center space-y-0 lg:hidden bg-white w-full overflow-hidden shadow-md z-40 transition-all duration-500 ease-in-out ${
          open ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0"
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
          <Link
            href="/acheivements"
            className="block text-black w-full mx-auto hover:bg-gray-100 py-2 transition-all duration-300 transform hover:translate-x-2"
            style={{
              transitionDelay: open ? "550ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            إنجازاتنا
          </Link>
          {isAuthenticated && (
            <Link
              href="/adminDashboard"
              className="block text-black w-full mx-auto hover:bg-gray-100 py-2 transition-all duration-300 transform hover:translate-x-2"
              style={{
                transitionDelay: open ? "550ms" : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-20px)",
              }}
            >
              لوحة التحكم
            </Link>
          )}
          {/* Conditional Login/Logout Button for Mobile */}
          {isAuthenticated ? (
            <div
              className="block  mx-auto transition-all duration-300"
              style={{
                transitionDelay: open ? "650ms" : "0ms",
                opacity: open ? 1 : 0,
              }}
            >
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="block w-full mx-auto py-2 bg-white text-green-900 rounded-xl font-semibold hover:bg-emerald-100 transition-all duration-300 shadow-md transform hover:translate-x-2"
                style={{
                  transitionDelay: open ? "650ms" : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                {isLoggingOut ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="block text-black w-full mx-auto hover:bg-gray-100 py-2 transition-all duration-300 transform hover:translate-x-2"
              style={{
                transitionDelay: open ? "650ms" : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-20px)",
              }}
            >
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
