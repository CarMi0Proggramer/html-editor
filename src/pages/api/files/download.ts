import type { APIRoute } from "astro";
import {
  sendBadRequestResponse,
  sendNotFoundException,
} from "../../../utils/exceptions";
import { stat, readFile } from "node:fs/promises";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const fileName = formData.get("fileName");
  const filePath = formData.get("filePath");

  if (!fileName) {
    return sendBadRequestResponse("Filename must be provided");
  } else if (!filePath) {
    return sendBadRequestResponse("Filepath must be provided");
  }

  const fileExists = await stat(filePath.toString())
    .then(() => true)
    .catch(() => false);

  if (!fileExists) {
    return sendNotFoundException("File not found");
  }

  const fileContent = await readFile(filePath.toString());

  return new Response(fileContent, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `attachment; filename="${fileName.toString()}.html"`,
    },
  });
};
