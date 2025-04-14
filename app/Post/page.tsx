import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostBody from "@/components/PostBody";
import React from "react";

export default function page() {
  return (
    <>
      <div className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20]">
        <Header />
      </div>
      <PostBody />
      <Footer />
    </>
  );
}
