"use client";

import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../Services/authAPI";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";

// Define interface for login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Updated interface to match Supabase's return structure
interface User {
  id: string;
  email?: string;
  // Add other user properties as needed
}

interface Session {
  access_token: string;
  // Add other session properties as needed
}

interface WeakPassword {
  // Define properties if needed
}

// This interface matches what Supabase auth.signInWithPassword actually returns
interface SupabaseAuthResponse {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
}

export function useLogin() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const mutation = useMutation<SupabaseAuthResponse, Error, LoginCredentials>({
    mutationFn: ({ email, password }: LoginCredentials) =>
      loginAPI({ email, password }),
    onSuccess: (data) => {
      // Show success notification
      showNotification({
        type: "success",
        message: "تم تسجيل الدخول بنجاح.",
      });
      // Redirect to the home page after successful login
      router.push("/");
    },
    onError: (error: Error) => {
      console.error("Login failed", error);
      // Show error notification
      showNotification({
        type: "error",
        title: "خطأ في تسجيل الدخول",
        message:
          "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
      });
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
