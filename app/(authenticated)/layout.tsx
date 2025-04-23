"use client";

import { useUser } from "@/authentication/useUser";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useUser();
  const router = useRouter();

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  // Once loading is complete, check authentication
  if (!isAuthenticated) {
    // Handle this case directly with client-side navigation
    router.push("/login");

    // Show a temporary loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  // If authenticated, render the page content
  return children;
}
