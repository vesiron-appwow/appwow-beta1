import type { APIRoute } from "astro";
import { addSubmission } from "../../lib/data/submissionstore";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  if (
    !body?.id ||
    !body?.name ||
    !body?.description ||
    !body?.url ||
    !body?.category
  ) {
    return new Response("Invalid submission", { status: 400 });
  }

  await addSubmission({
    id: body.id,
    name: body.name,
    description: body.description,
    url: body.url,
    category: body.category,
    status: "pending",
  });

  return new Response("OK", { status: 200 });
};
