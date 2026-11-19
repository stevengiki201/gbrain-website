import { NextResponse, type NextRequest } from "next/server";
import { middleware as intlMiddleware } from "../i18n";

export default function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(
    /^\/(?:(en|sw)\/)?docs(?:\/([^/]+))?(?:\/([^/]+))?\/?$/,
  );

  if (match) {
    const [, localePrefix, product, slug] = match;
    const swahili = localePrefix === "sw";
    let target = swahili ? "/sw/bidhaa" : "/products";
    if (product) {
      target += `/${product}/docs`;
      if (slug) target += `/${slug}`;
    }
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
