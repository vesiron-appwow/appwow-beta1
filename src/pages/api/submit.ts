import type { APIRoute } from "astro";
import { addSubmission } from "../../lib/data/submissionstore";

/* Allow browser GET requests safely */
export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/submit",
    },
  });
};

/* Handle form submission */
export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const id = crypto.randomUUID();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const url = formData.get("url")?.toString();
  const category = formData.get("category")?.toString();

  if (!name || !description || !url || !category) {
    return new Response("Invalid submission", { status: 400 });
  }

  await addSubmission({
    id,
    name,
    description,
    url,
    category,
    status: "pending",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/submit/thanks",
    },
  });
};
