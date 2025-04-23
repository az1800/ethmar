"use client";

import { getCurrentUser } from "@/Services/authAPI";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      ("Fetching user data...");
      try {
        const userData = await getCurrentUser();
        "User data received:", userData;
        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  "useUser hook - current state:", { user, error, isLoading };

  // Check authentication status
  const isAuthenticated = Boolean(user);

  "isAuthenticated:", isAuthenticated;
  "user:", user;

  if (error) {
    console.error("Authentication error:", error);
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
    };
  }

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
