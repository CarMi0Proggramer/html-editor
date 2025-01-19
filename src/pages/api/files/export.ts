import type { APIRoute } from "astro";
import {
  sendBadRequestResponse,
  sendNotFoundException,
} from "../../../utils/exceptions";
import { getDocumentById } from "../../../utils/documents";
import { getDocumentSectionsByDocumentId } from "../../../utils/document-sections";
import { formatDocumentContent } from "../../../utils/format-document";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const assetsDir = resolve("src", "assets");
const tempDir = "/tmp/";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const documentId = formData.get("documentId");

  if (!documentId) {
    return sendBadRequestResponse("Document.id must be provided");
  }

  const document = await getDocumentById(documentId.toString());

  if (!document) {
    return sendNotFoundException(`Document with id: ${documentId} not found`);
  }

  const documentSections = await getDocumentSectionsByDocumentId(
    documentId.toString()
  );

  const formattedSections = documentSections.map((section) => ({
    ...section,
    content: formatDocumentContent(section.content),
  }));

  const jsCode = readFileSync(join(assetsDir, "js/documents.js"), "utf-8");
  const cssCode = readFileSync(join(assetsDir, "css/documents.css"), "utf-8");
  const htmlSectionsCode = generateHtmlSectionsCode(formattedSections);

  const html = `
  <!DOCTYPE html>
  <html lang="es"> 
    <head> 
      <meta charset="UTF-8"> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
      <title>${document.name}</title>
      <style>${cssCode}</style> 
    </head> 
    <body>
      <div class="wrapper">
        ${htmlSectionsCode}
      </div>
      <script>${jsCode}</script> 
    </body> 
  </html>
  `;

  const fileName = `${crypto.randomUUID()}.html`;
  const filePath = join(tempDir, fileName);

  writeFileSync(filePath, html);

  return new Response(JSON.stringify({ filePath, fileName }), {
    status: 200,
  });
};

function generateHtmlSectionsCode(
  documentSections: {
    heading: string;
    content: string;
  }[]
) {
  return documentSections.reduce((acc, val) => {
    return (
      acc +
      `<div class="accordion">
        <h3 class="accordion-title">
          ${val.heading}
          <svg 
            class="accordion-icon" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </h3>
        <div class="accordion-description">
        ${val.content}
        </div>
      </div>`
    );
  }, "");
}
