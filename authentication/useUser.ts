import { getCurrentUser } from "@/Services/authAPI";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrentUser });

  if (error) return null;

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
