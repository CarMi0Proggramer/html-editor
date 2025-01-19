export function formatDocumentContent(content: FormDataEntryValue | string) {
  // Convertir el contenido a una cadena
  let formattedContent = content.toString();

  // Reemplazar los enlaces con etiquetas anchor
  formattedContent = formattedContent.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a style="color: #2563eb; text-decoration: underline;" target="_blank" href="$1">$1</a>'
  );

  // Reemplazar los saltos de línea con etiquetas <br>
  formattedContent = formattedContent.replace(/\n/g, "<br>");

  return formattedContent;
}
