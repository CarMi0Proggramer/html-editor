import { db, Document, eq } from "astro:db";

export async function createEmptyDocument() {
  const result = await db
    .insert(Document)
    .values({ id: crypto.randomUUID(), name: "Nuevo Documento" })
    .returning();

  const [document] = result;

  return document;
}

export async function getDocuments() {
  return await db.select().from(Document);
}

export async function getDocumentById(id: string) {
  const result = await db.select().from(Document).where(eq(Document.id, id));
  const [document] = result;

  return document;
}

export async function deleteDocumentById(documentId: string) {
  await db.delete(Document).where(eq(Document.id, documentId));
}

export async function updateDocument(id: string, data: { name?: string }) {
  await db.update(Document).set(data).where(eq(Document.id, id));

  return await getDocumentById(id);
}
