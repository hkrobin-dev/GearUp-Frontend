import { NextRequest, NextResponse } from "next/server";

// Maps a protected path prefix to the roles allowed to access it.
const roleProtectedRoutes: { prefix: string; roles: string[] }[] = [
  { prefix: "/dashboard/customer", roles: ["CUSTOMER"] },
  { prefix: "/dashboard/provider", roles: ["PROVIDER"] },
  { prefix: "/dashboard/admin", roles: ["ADMIN"] },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matched = roleProtectedRoutes.find((r) => pathname.startsWith(r.prefix));
  if (!matched) return NextResponse.next();

  const token = request.cookies.get("gearup_token")?.value;
  const role = request.cookies.get("gearup_role")?.value;

  // Not logged in at all -> send to login, remember where they were headed
  if (!token || !role) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in but wrong role for this section -> bounce to their own dashboard
  if (!matched.roles.includes(role)) {
    const fallback =
      role === "ADMIN"
        ? "/dashboard/admin"
        : role === "PROVIDER"
        ? "/dashboard/provider"
        : "/dashboard/customer";
    return NextResponse.redirect(new URL(fallback, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
