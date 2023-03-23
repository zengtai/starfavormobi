import { IMAGE_FORMAT, IMAGE_PATH } from "@/lib/constants";

export default function getImageUrl(name) {
  return `${IMAGE_PATH}${IMAGE_FORMAT}/${name}.${IMAGE_FORMAT}`;
}
