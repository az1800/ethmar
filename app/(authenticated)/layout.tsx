"use client";
import { useUser } from "@/authentication/useUser";
import { useNotification } from "@/components/Notification";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader } from "lucide-react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useUser();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      showNotification({
        type: "error",
        title: "خطأ في الوصول",
        message:
          "يجب تسجيل الدخول للوصول إلى هذه الصفحة. سيتم إعادة توجيهك إلى صفحة تسجيل الدخول.",
        duration: 4000,
      });

      // Short delay before redirect to show the notification
      const redirectTimer = setTimeout(() => {
        redirect("/login");
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isLoading, isAuthenticated, showNotification]);

  // Show loading state or the children
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin" />
    </div>
  ) : (
    children
  );
}
