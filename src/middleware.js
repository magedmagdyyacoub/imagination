import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // حماية الـ Admin Dashboard
  if (pathname.startsWith("/admin")) {

    // لو مش عامل تسجيل دخول
    if (!token) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }

    // لو عامل تسجيل دخول بس مش ADMIN
    if (token.role !== "ADMIN") {
      const profileUrl = req.nextUrl.clone();
      profileUrl.pathname = "/profile";
      return NextResponse.redirect(profileUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
