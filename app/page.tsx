"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use "next/navigation" in Next.js App Router (v13+)
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push("/blog"); // Change to your desired route
    }
  }, [router]);

  return null; // Prevent rendering while redirecting
}
