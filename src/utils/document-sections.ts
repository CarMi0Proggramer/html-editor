import { db, DocumentSection, eq } from "astro:db";

export async function createDocumentSection(data: {
  heading: string;
  documentId: string;
  content: string;
}) {
  const result = await db
    .insert(DocumentSection)
    .values({ ...data, id: crypto.randomUUID() })
    .returning();
  const [documentSection] = result;

  return documentSection;
}

export async function getDocumentSectionsByDocumentId(documentId: string) {
  const result = await db
    .select()
    .from(DocumentSection)
    .where(eq(DocumentSection.documentId, documentId));

  return result;
}

export async function deleteDocumentSectionsByDocumentId(documentId: string) {
  await db
    .delete(DocumentSection)
    .where(eq(DocumentSection.documentId, documentId));
}
