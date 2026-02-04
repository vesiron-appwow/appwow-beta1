import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  /* PUBLIC ROUTES — NO KEY REQUIRED */
  if (
    pathname === "/" ||
    pathname === "/submit" ||
    pathname === "/submit/thanks" ||
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
