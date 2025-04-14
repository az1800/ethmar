"use client";

import { useRouter } from "next/navigation";
import { logOut as logOutAPI } from "../Services/authAPI";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/components/Notification";

export function useLogout() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: logOutAPI,
    onSuccess: () => {
      showNotification({
        type: "success",
        message: "تم تسجيل الخروج بنجاح.",
      });
      router.refresh();
      router.push("/");
    },
    onError: (error: Error) => {
      console.error("Logout failed", error);
      showNotification({
        type: "error",
        title: "خطأ في تسجيل الخروج",
        message: "حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.",
      });
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
