import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sessionToken")?.value;
  const userId = req.cookies.get("userId")?.value;

  const isPrivateRoute =
    req.nextUrl.pathname.startsWith("/tools") &&
    (req.nextUrl.pathname.includes("/bookings") || req.nextUrl.pathname.includes("/new"));

  if (isPrivateRoute && (!token || !userId)) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
