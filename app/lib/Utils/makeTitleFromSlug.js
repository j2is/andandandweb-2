export default function makeTitleFromSlug(slug) {
  if (!slug) {
    return;
  }
  const str = slug.split("-").join(" ").replace("_", " ");
  const withoutFileExtension = str.replace(".pdf", "");
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
