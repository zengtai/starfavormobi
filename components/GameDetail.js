import { useState } from "react";
// import Image from "./Image";
import Image from "next/image";
import Link from "next/link";
import { starIcon } from "./Icons";

import getGameUrl from "@/utils/getGameUrl";
import getImageUrl from "@/utils/getImageUrl";

export default function GameDetail({ game }) {
  const [isShowAll, setIsShowAll] = useState(false);
  function toggle() {
    setIsShowAll(!isShowAll);
  }

  const handleClick = () => {
    if (typeof window !== "undefined") {
      let currentPlayedGames = JSON.parse(localStorage.getItem("playedGames")) || [];
      currentPlayedGames.push(game.slug);
      localStorage.setItem("playedGames", JSON.stringify(currentPlayedGames));
    }
  };
  return (
    <>
      <div className="mx-4 flex flex-row flex-wrap items-center text-gray-700 md:mx-0 md:items-start md:p-5">
        <div className="flex space-x-3 md:space-x-6">
          <div className="">
            <Image
              className="h-20 w-20 shrink-0 rounded-xl bg-black/5 md:h-40 md:w-40"
              src={getImageUrl(game.name)}
              alt={game.title}
              width={100}
              height={100}
            />
          </div>
          <div>
            <h1 className="pb-2 text-xl font-semibold md:text-4xl">
              <span>{game.title}</span>
            </h1>
            <p className="uppercase">
              <Link
                href={`/category/${game.category.slug}`}
                className="rounded-md border border-gray-200 py-1 px-1.5 text-xs text-gray-400"
              >
                {game.category.name}
              </Link>
            </p>
            <p className="mt-3 flex flex-row items-center justify-center space-x-2 md:justify-start xl:space-x-3">
              <span className="flex flex-row items-center text-lg font-bold text-orange-500 xl:text-2xl">
                <b className="h-6 w-6 md:h-8 md:w-8">{starIcon()}</b>
                {game.stars}
              </span>
              <span className="text-sm opacity-80">{game.played} played</span>
            </p>
          </div>
        </div>
        <p className="w-full py-4 md:pt-2">
          <Link
            href={getGameUrl(game.name)}
            className="mx-auto block w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 p-3 text-center text-lg font-bold text-white shadow-lg shadow-orange-400/20 transition-transform duration-300 ease-in-out md:w-96 md:hover:scale-110 md:hover:shadow-2xl md:hover:shadow-black/40 md:hover:delay-100 lg:p-4 lg:text-2xl"
            title={`Play ${game.title} now`}
            onClick={handleClick}
          >
            PLAY NOW
          </Link>
        </p>
        <div
          onClick={toggle}
          className={`
            ${
              isShowAll ? `h-auto` : `max-h-16`
            } relative w-full overflow-hidden text-ellipsis py-3 text-sm text-slate-500 after:absolute after:left-0 after:bottom-0 after:h-5 after:w-full after:bg-gradient-to-t after:from-white after:to-white/0`}
        >
          {game.description}
        </div>
      </div>
    </>
  );
}
