// import { useMutation } from "@tanstack/react-query";
// import { login as loginAPI } from "../Services/authAPI";
// import { useRouter } from "next/navigation";
// import { useNotification } from "@/components/Notification"; // Import the notification hook

// // Define interface for login credentials
// interface LoginCredentials {
//   email: string;
//   password: string;
// }

// // Define interface for login response (adjust based on your actual API response)
// interface LoginResponse {
//   token?: string;
//   user?: {
//     id: string;
//     email: string;
//   };
// }

// export function useLogin() {
//   const router = useRouter();
//   const { showNotification } = useNotification(); // Use the notification hook

//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: ({ email, password }: LoginCredentials) =>
//       loginAPI({ email, password }),
//     onSuccess: (data: LoginResponse) => {
//       console.log("Login successful", data);

//       // Show success notification
//       showNotification({
//         type: "success",
//         message: "تم تسجيل الدخول بنجاح.",
//       });

//       // Redirect to the home page or any other page after successful login
//       router.push("/");
//     },
//     onError: (error: Error) => {
//       console.error("Login failed", error);

//       // Show error notification
//       showNotification({
//         type: "error",
//         title: "خطأ في تسجيل الدخول",
//         message:
//           "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
//       });
//     },
//   });

//   return { login, isLoading };
// }
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

// Define interface for login response
interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
  };
}

export function useLogin() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      loginAPI({ email, password }),
    onSuccess: (data: LoginResponse) => {
      console.log("Login successful", data);
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
