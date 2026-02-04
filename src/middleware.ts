import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  /* ALWAYS-ALLOWED ROUTES (prevents redirect loops) */
  if (
    pathname === "/" ||
    pathname === "/developers" ||
    pathname === "/submit" ||
    pathname.startsWith("/submit/") ||
    pathname.startsWith("/api/submit")
  ) {
    return next();
  }

  /* KEY-GATED ROUTES */
  const key = context.url.searchParams.get("key");
  if (key === "ALPHA") {
    return next();
  }

  /* FALLBACK */
  return context.redirect("/developers");
});
