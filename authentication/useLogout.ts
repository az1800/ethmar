"use client";
import { useRouter } from "next/navigation";
import { logOut as logOutAPI } from "../Services/authAPI";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const router = useRouter();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logOutAPI,
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
  });

  return { logout, isLoading };
}
