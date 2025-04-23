"use client";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/Formmating/RichTextEditor";
import Header from "@/components/Header";
import { useUser } from "@/authentication/useUser";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import React from "react";

export default function RichTextEditorPage() {
  const { user, isLoading, isAuthenticated } = useUser();
  const router = useRouter();

  // Handle authentication check
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
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
