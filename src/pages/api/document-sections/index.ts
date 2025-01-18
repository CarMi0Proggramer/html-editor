import type { APIRoute } from "astro";
import { sendBadRequestResponse } from "../../../utils/exceptions";
import { createDocumentSection } from "../../../utils/document-sections";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const heading = formData.get("heading");
  const content = formData.get("content");
  const documentId = formData.get("documentId");

  if (!heading) {
    return sendBadRequestResponse("DocumentSection.heading must be provided");
  } else if (!content) {
    return sendBadRequestResponse("DocumentSection.content must be provided");
  } else if (!documentId) {
    return sendBadRequestResponse(
      "DocumentSection.documentId must be provided"
    );
  }

  const documentSection = await createDocumentSection({
    heading: heading.toString(),
    content: content.toString(),
    documentId: documentId.toString(),
  });

  return new Response(JSON.stringify(documentSection), {
    status: 200,
  });
};
