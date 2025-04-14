import { getCurrentUser } from "@/Services/authAPI";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrentUser });

  // Return a safe default when there's an error instead of null
  if (error) {
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
    };
  }

  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
