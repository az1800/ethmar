"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push("https://ethmarspp.stuclubs.com/home");
    }
  }, [router]);

  return null; // Prevent rendering while redirecting
}
