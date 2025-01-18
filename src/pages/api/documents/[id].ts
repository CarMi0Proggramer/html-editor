import type { APIRoute } from "astro";
import {
  deleteDocumentById,
  getDocumentById,
  updateDocument,
} from "../../../utils/documents";
import {
  sendBadRequestResponse,
  sendInternalServerException,
  sendNotFoundException,
} from "../../../utils/exceptions";
import { deleteDocumentSectionsByDocumentId } from "../../../utils/document-sections";

export const DELETE: APIRoute = async ({ params }) => {
  const { id: documentId } = params;

  if (documentId) {
    const document = await getDocumentById(documentId);

    if (!document) {
      return sendNotFoundException(`Document with id: ${documentId} not found`);
    }

    try {
      await deleteDocumentSectionsByDocumentId(documentId);
      deleteDocumentById(documentId);

      return new Response(JSON.stringify(document), {
        status: 200,
      });
    } catch {
      return sendInternalServerException(
        `Could not delete document with id: ${documentId}`
      );
    }
  }

  return sendBadRequestResponse("Document.id must be provided");
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;

  if (!id) {
    return sendBadRequestResponse("Document.id must be provided");
  }

  const data = await request.formData();
  const name = data.get("name");

  if (!name) {
    return sendBadRequestResponse("Document.name must be provided");
  }

  const updatedDocument = await updateDocument(id, { name: name.toString() });

  return new Response(JSON.stringify(updatedDocument), { status: 200 });
};
