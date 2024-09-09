import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/sign-in", "/", "/sign-up", "/dashboard/:path*", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
    // Get token from request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECERET,
    });
    const url = request.nextUrl;

    // Redirect to dashboard if user is authenticated and visiting a public page
    if (
      token &&
      (url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/sign-up") ||
        url.pathname.startsWith("/verify") ||
        url.pathname === "/")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect to sign-in if no token is found and visiting a protected page
    if (!token && url.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }



    return NextResponse.next();
}
