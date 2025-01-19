import type { APIRoute } from "astro";
import {
  sendBadRequestResponse,
  sendInternalServerException,
  sendNotFoundException,
} from "../../../utils/exceptions";
import {
  deleteDocumentSectionById,
  getDocumentSectionById,
} from "../../../utils/document-sections";

export const DELETE: APIRoute = async ({ params }) => {
  const { id: documentSectionId } = params;

  if (documentSectionId) {
    const documentSection = await getDocumentSectionById(documentSectionId);

    if (!documentSection) {
      return sendNotFoundException(
        `Document section with id: ${documentSectionId} not found`
      );
    }

    try {
      deleteDocumentSectionById(documentSectionId);

      return new Response(JSON.stringify(documentSection), {
        status: 200,
      });
    } catch {
      return sendInternalServerException(
        `Could not delete document section with id: ${documentSectionId}`
      );
    }
  }

  return sendBadRequestResponse("DocumentSection.id must be provided");
};
