import { middleware } from "../i18n";

export default middleware;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
