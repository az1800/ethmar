// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Define protected routes
  const isGuestRoute = pathname.startsWith("/login");
  const isAuthRoute =
    pathname.startsWith("/adminDashboard") ||
    pathname.startsWith("/blog-write");

  // Handle guest routes (accessible only for non-authenticated users)
  if (isGuestRoute && session) {
    // Redirect authenticated users away from guest routes
    url.pathname = "/";
    // Set a cookie to trigger a notification on the client side
    const response = NextResponse.redirect(url);
    response.cookies.set(
      "notification",
      JSON.stringify({
        type: "info",
        message: "أنت مسجل دخول بالفعل",
      })
    );
    return response;
  }

  // Handle authenticated routes (accessible only for authenticated users)
  if (isAuthRoute && !session) {
    // Redirect non-authenticated users to login
    url.pathname = "/login";
    // Set a cookie to trigger a notification on the client side
    const response = NextResponse.redirect(url);
    response.cookies.set(
      "notification",
      JSON.stringify({
        type: "error",
        message: "يجب تسجيل الدخول للوصول إلى هذه الصفحة",
      })
    );
    return response;
  }

  return res;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/login", "/adminDashboard/:path*", "/blog-write/:path*"],
};
