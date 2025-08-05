export const markdownLinksToPlainText = (markdownText: string) => {
  return markdownText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
};

export const removeImageFromMarkdown = (markdownText: string) => {
  return markdownText.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");
};
