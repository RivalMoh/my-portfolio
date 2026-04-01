export function slugifyCategory(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '-');
}
