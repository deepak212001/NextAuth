//  name only middleware

import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  //   means ye public path hai
  // now check any use login aur not
  const token = request.cookies.get("token")?.value || "";

  // mean koi user login hai and vo abhi public path pe hai to vo redirect ho jaye profile page pe
  if (isPublicPath && token)
    return NextResponse.redirect(new URL("/profile", request.url));
  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
//   matcher: "/about/:path*",
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile',
  ],
};
//  es config me apme path sal ko aur us path pe jayega to ye middleware chalega
