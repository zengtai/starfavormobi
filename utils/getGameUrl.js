import { GAME_PATH } from "@/lib/constants";

export default function getGameUrl(name) {
  return `${GAME_PATH + name}`;
}
