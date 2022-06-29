import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "../components/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Banner from "../components/Banner";
import { ADS_SLOT_ID } from "../lib/constants";

export default function InfiniteList({ games, init = 8, step = 5, group }) {
  // console.log(games.length);
  let data = games.slice();

  // data = data.reverse();

  const initGames =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(`scrollGames${group}`)) ||
        data.slice(0, init)
      : data.slice(0, init);

  const total = data.length;

  const [scrollGames, setScrollGames] = useState(initGames);
  const [hasMore, setHasMore] = useState(true);

  const getMoreGames = () => {
    const newScrollGames = data.slice(
      scrollGames.length,
      scrollGames.length + step
    );

    setScrollGames((game) => [...game, ...newScrollGames]);

    if (scrollGames.length >= total) {
      setHasMore(!hasMore);
    }
  };

  useEffect(() => {
    localStorage.removeItem(`scrollGames${group}`);
    localStorage.setItem(`scrollGames${group}`, JSON.stringify(scrollGames));
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
        <ul className="grid grid-cols-4 gap-3 py-3 px-4 md:grid-cols-6 md:gap-6 md:px-12 lg:grid-cols-8 2xl:grid-cols-12">
          {scrollGames.map((game, index) => {
            if ((index - 8) % 11 === 0) {
              return (
                <li
                  key={game.id}
                  className={`col-span-2 row-span-2 md:col-auto md:row-auto`}
                >
                  <Link href={`/game/${game.slug}`}>
                    <a className="md:delay-50 duration-400 group relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 transition ease-in-out hover:shadow-lg hover:shadow-black/40 md:hover:origin-bottom md:hover:scale-110">
                      <Image
                        src={game.icon}
                        alt={game.title}
                        width={200}
                        height={200}
                        layout="responsive"
                        className="w-full bg-loading bg-center bg-no-repeat"
                      />
                      <div className="absolute -bottom-[150%] hidden h-full w-full items-end justify-center text-center text-xs font-semibold group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 sm:flex md:group-hover:bottom-0">
                        <div className="h-auto w-full text-ellipsis p-2 text-center">
                          <h3 className="leading-4">{game.title}</h3>
                          <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="-ml-1 h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {game.stars}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={game.id}>
                  <Link href={`/game/${game.slug}`}>
                    <a className="md:delay-50 duration-400 group relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 transition ease-in-out hover:shadow-lg hover:shadow-black/40 md:hover:origin-bottom md:hover:scale-110">
                      <Image
                        src={game.icon}
                        alt={game.title}
                        width={200}
                        height={200}
                        layout="responsive"
                        className="w-full bg-loading bg-center bg-no-repeat"
                      />
                      <div className="absolute -bottom-[150%] hidden h-full w-full items-end justify-center text-center text-xs font-semibold group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 sm:flex md:group-hover:bottom-0">
                        <div className="h-auto w-full text-ellipsis p-2 text-center">
                          <h3 className="leading-4">{game.title}</h3>
                          <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="-ml-1 h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {game.stars}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        {scrollGames.length >= total && group % 2 == 1 && group < 5 ? (
          group == 1 ? (
            <Banner
              className={`banner`}
              style={{ display: "block" }}
              slot={ADS_SLOT_ID.home}
              responsive="false"
            />
          ) : (
            <Banner
              style={{ display: "block" }}
              slot={ADS_SLOT_ID.home}
              responsive="true"
              auto
            />
          )
        ) : null}
      </InfiniteScroll>
    </>
  );
}
