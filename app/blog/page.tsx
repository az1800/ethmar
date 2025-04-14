// "use client";
import { Suspense } from "react";
import HeroSection from "../../components/HeroSection";
import Posts from "../../components/Posts";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <>
      <HeroSection />
      {/* <Suspense fallback={<div>Loading posts...</div>}> */}
      <Posts />
      {/* </Suspense> */}
      <Footer />
    </>
  );
}
