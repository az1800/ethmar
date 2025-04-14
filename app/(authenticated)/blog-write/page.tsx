"use client";

import Footer from "@/components/Footer";
import RichTextEditor from "@/components/Formmating/RichTextEditor";
import Header from "@/components/Header";

import React from "react";

export default function page() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-black">
          <Header />
        </div>
        <div className="flex-1">
          <RichTextEditor />
        </div>

        <Footer />
      </div>
    </>
  );
}
