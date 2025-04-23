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

        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Check authentication status
  const isAuthenticated = Boolean(user);

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
