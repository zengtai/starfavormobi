import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "../components/Image";
import InfiniteScroll from "react-infinite-scroll-component";
// import Banner from "../components/Banner";
import { ADS_SLOT_ID } from "../lib/constants";
import { getImageUrl } from "@/lib/api";
import AdSense from "./AdSense";

export default function InfiniteList({ games, init = 8, step = 5, group }) {
  // console.log(games.length);
  let data = games.slice();

  // data = data.reverse();

  const initGames =
    typeof window !== "undefined" && localStorage.getItem(`scrollGames${group}`) != null
      ? JSON.parse(localStorage.getItem(`scrollGames${group}`)).games || data.slice(0, init)
      : data.slice(0, init);

  const total = data.length;

  const [scrollGames, setScrollGames] = useState(initGames);
  const [hasMore, setHasMore] = useState(true);

  const getMoreGames = () => {
    const newScrollGames = data.slice(scrollGames.length, scrollGames.length + step);

    setScrollGames((game) => [...game, ...newScrollGames]);

    if (scrollGames.length >= total) {
      setHasMore(!hasMore);
    }
  };

  useEffect(() => {
    const timeStamp = new Date(`2022-06-29`);
    let data = {
      games: scrollGames,
      time: timeStamp,
    };
    // console.log(`data`, JSON.stringify(data));
    // localStorage.getItem(`adbeeScrollGames${group}`) ?
    // localStorage.removeItem(`adbeeScrollGames${group}`);
    localStorage && localStorage.getItem(`scrollGames${group}`) != null
      ? localStorage.getItem(`scrollGames${group}`).time != timeStamp
        ? localStorage.removeItem(`scrollGames${group}`)
        : null
      : null;

    localStorage.setItem(`scrollGames${group}`, JSON.stringify(data));
  }, [scrollGames, group]);

  // useEffect(() => {
  //   localStorage.removeItem(`scrollGames${group}`);
  //   localStorage.setItem(`scrollGames${group}`, JSON.stringify(scrollGames));
  // }, [scrollGames, group]);

  return (
    <>
      <InfiniteScroll
        style={{ overflow: "visible" }}
        dataLength={scrollGames.length}
        next={getMoreGames}
        hasMore={hasMore}
        loader={<div className="my-2 text-center">Loading...</div>}
      >
        <ul className="grid grid-cols-4 gap-3 py-3 px-4 md:grid-cols-6 md:gap-6 md:px-12 lg:grid-cols-8 2xl:grid-cols-11">
          {scrollGames.map((game, index) => {
            if ((index - 8) % 11 === 0) {
              return (
                <li key={game.slug} className={`col-span-2 row-span-2 md:col-auto md:row-auto`}>
                  <Link
                    href={`/game/${game.slug}`}
                    className="md:delay-50 duration-400 group relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 transition ease-in-out hover:shadow-lg hover:shadow-black/40 md:hover:origin-bottom md:hover:scale-110"
                  >
                    <>
                      <Image
                        src={getImageUrl(game.name)}
                        alt={game.title}
                        width={200}
                        height={200}
                        className="w-full bg-loading bg-center bg-no-repeat"
                      />
                      <div className="absolute -bottom-[150%] hidden h-full w-full items-end justify-center text-center text-xs font-semibold group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 sm:flex md:group-hover:bottom-0">
                        <div className="h-auto w-full text-ellipsis p-2 text-center">
                          <h3 className="leading-4">{game.title}</h3>
                          <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                            <svg className="-ml-1 h-5 w-5">
                              <use xlinkHref="#__star"></use>
                            </svg>
                            {game.stars}
                          </p>
                        </div>
                      </div>
                    </>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={game.slug}>
                  <Link
                    href={`/game/${game.slug}`}
                    className="md:delay-50 duration-400 group relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 transition ease-in-out hover:shadow-lg hover:shadow-black/40 md:hover:origin-bottom md:hover:scale-110"
                  >
                    <>
                      <Image
                        src={getImageUrl(game.name)}
                        alt={game.title}
                        width={200}
                        height={200}
                        className="w-full bg-loading bg-center bg-no-repeat"
                      />
                      <div className="absolute -bottom-[150%] hidden h-full w-full items-end justify-center text-center text-xs font-semibold group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 sm:flex md:group-hover:bottom-0">
                        <div className="h-auto w-full text-ellipsis p-2 text-center">
                          <h3 className="leading-4">{game.title}</h3>
                          <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                            <svg className="-ml-1 h-5 w-5">
                              <use xlinkHref="#__star"></use>
                            </svg>
                            {game.stars}
                          </p>
                        </div>
                      </div>
                    </>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        {scrollGames.length >= total && group % 2 == 1 && group < 5 ? (
          group == 1 ? (
            <AdSense className={`banner`} slot={ADS_SLOT_ID.HOME} />
          ) : (
            <AdSense slot={ADS_SLOT_ID.HOME} />
          )
        ) : null}
      </InfiniteScroll>
    </>
  );
}
