import { auth } from "@/auth";

export const proxy = auth;

export const config = {
  matcher: [
    "/today/:path*",
    "/goals/:path*",
    "/time/:path*",
    "/planner/:path*",
    "/journal/:path*",
    "/insights/:path*",
    "/activities/:path*",
  ],
};