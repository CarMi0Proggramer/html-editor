import { column, defineDb, defineTable } from "astro:db";

export const Document = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  },
});

export const DocumentSection = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    documentId: column.text({ references: () => Document.columns.id }),
    heading: column.text(),
    content: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Document,
    DocumentSection,
  },
});
