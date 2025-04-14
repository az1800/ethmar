"use client";

import { useUser } from "@/authentication/useUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean; // true = require authentication, false = require no authentication
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    redirect("/login");
  }

  if (!requireAuth && isAuthenticated) {
    redirect("/");
  }

  return <>{children}</>;
}
