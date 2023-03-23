export default function toSlug(name) {
  console.log(`name`, name, typeof name);
  if (typeof name == "string") {
    const toSlugName = name.trim().replace(/\s+/g, "-").replace(/\./, "").toLowerCase();
    return toSlugName;
  }
}
