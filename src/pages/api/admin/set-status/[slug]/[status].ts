import type { APIRoute } from "astro";
import { updateStatus } from "../../../../../lib/data/submissionstore";

export const POST: APIRoute = async ({ params }) => {
  const { slug, status } = params;

  if (!slug || !status) {
    return new Response("Missing slug or status", { status: 400 });
  }

  await updateStatus(slug, status);

  return new Response("OK", { status: 200 });
};
