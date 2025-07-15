import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostBody from "@/components/PostBody";
import React from "react";

export default function page() {
  return (
    <>
      <div className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjEwem0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjZoMnYxMHoiLz48L2c+PC9zdmc+')]"></div>
        <Header />
      </div>
      <PostBody />
      <Footer />
    </>
  );
}
