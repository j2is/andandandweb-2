export default ({ title, material, colour }) => {
  return encodeURI(
    `${title}-${material || ""}-${colour || ""}`
      .replace(/\s+/g, "-")
      .toLowerCase()
  );
};
