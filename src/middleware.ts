import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/sign-in", "/", "/sign-up", "/dashboard/:path*", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({req: request});
  const url = request.nextUrl;
  console.log(token)

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    console.log(token, "if token exists");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    console.log(token, "if token not exists");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  console.log(token, "both if not executed");
  return NextResponse.next();
}
