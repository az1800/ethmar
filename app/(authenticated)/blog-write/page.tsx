"use client";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/Formmating/RichTextEditor";
import Header from "@/components/Header";
import { useUser } from "@/authentication/useUser";
import { useRouter } from "next/navigation";

import React from "react";
import Loader from "@/components/Loader";

export default function RichTextEditorPage() {
  const { user, isLoading, isAuthenticated } = useUser();
  const router = useRouter();

  // Handle authentication check
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    // Use immediate router push for client-side navigation
    router.push("/login");

    return (
      <div className="flex justify-center items-center h-screen">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  // If authenticated, show the actual page content
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20]">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjEwem0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjZoMnYxMHoiLz48L2c+PC9zdmc+')]"></div>
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
