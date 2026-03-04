import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

function shouldSkipLocale(pathname: string): boolean {
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/portal")) return true;
  if (pathname.startsWith("/empleados")) return true;
  return false;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (shouldSkipLocale(pathname)) {
    return NextResponse.next();
  }
  const localeParam = request.nextUrl.searchParams.get("locale");
  if (localeParam && (routing.locales as readonly string[]).includes(localeParam)) {
    const url = new URL(pathname, request.url);
    url.searchParams.delete("locale");
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", localeParam, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
