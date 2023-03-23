export default function toCapitalize(str) {
  return str.trim().toLowerCase().charAt(0).toUpperCase() + str.slice(1);
}
