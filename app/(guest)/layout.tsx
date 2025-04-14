"use client";
import { useUser } from "@/authentication/useUser";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function GuestLayout({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, router]);

  // Show login page immediately if we know we're not authenticated
  if (!isLoading && !isAuthenticated) {
    return <>{children}</>;
  }

  // Only show loader if we're actually loading
  if (isLoading) {
    return <Loader />;
  }

  // This should not be reached, but just in case
  return null;
}
