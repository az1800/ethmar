import PlausibleProvider from "next-plausible";
import { Suspense } from "react";
import HeroSection from "../../components/HeroSection";
import Posts from "../../components/Posts";
import Footer from "../../components/Footer";
import Header from "@/components/Header";

export default function Page() {
  return (
    <>
      <HeroSection type={"post"} />
      {/* <Suspense fallback={<div>Loading posts...</div>}> */}
      <Posts />
      {/* </Suspense> */}
      <Footer />
    </>
  );
}
