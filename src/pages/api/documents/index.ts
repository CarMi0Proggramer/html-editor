import type { APIRoute } from "astro";
import { createEmptyDocument } from "../../../utils/documents";

export const POST: APIRoute = async () => {
  const document = await createEmptyDocument();

  return new Response(JSON.stringify(document), {
    status: 200,
  });
};
