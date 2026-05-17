/** Normalises Contentful CDN URLs — protocol-relative and http → https */
export const toHttps = (url: string | undefined): string => {
  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("http://")) return url.replace(/^http:\/\//i, "https://");
  return url;
};
