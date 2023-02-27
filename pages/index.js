import Head from "next/head";
import { useEffect, useState } from "react";
import {
  fireIcon,
  topIcon,
  gameIcon,
  categoryIcon,
  historyIcon,
} from "../components/Icons";
import { getGames } from "../lib/api";

import Layout from "../components/Layout";
import { ADS_SLOT_ID, SITE_META, FEATURED_GAMES } from "../lib/constants";
import GameList from "../components/GameList";
import PlayedList from "../components/PlayedList";
import CategoryList from "../components/CategoryList";

import dynamic from "next/dynamic";

const Banner = dynamic(() => import("../components/Banner"), {
  loading: () => <div>Loading...</div>,
});

const InfiniteList = dynamic(() => import("../components/InfiniteList"), {
  loading: () => <div>Loading...</div>,
});

export default function Home({ games, newGames, featuredGames, categories }) {
  const [playedGames, setPlayedGames] = useState();

  useEffect(() => {
    let playedGamesBySlug;
    if (typeof window !== "undefined") {
      let playedGames = JSON.parse(localStorage.getItem("playedGames")) || [];
      if (playedGames.length) {
        playedGamesBySlug = games.filter((game) =>
          playedGames.includes(game.slug)
        );
        setPlayedGames(() => playedGamesBySlug);
      }
    }
  }, [games]);

  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>{SITE_META.name} | Play Free Games Online</title>
        </Head>
        <div className="relative z-30 grow pt-12 md:pt-0">
          <div className="hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="__star"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <GameList
            icon={fireIcon()}
            iconClassName="text-orange-500"
            title="Popular This Week"
            games={featuredGames}
            isPriority
            cols="3"
          />

          <Banner
            className={`banner`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="false"
          />

          {playedGames ? (
            <PlayedList
              icon={historyIcon()}
              iconClassName="text-purple-400"
              title="Continue Playing"
              games={playedGames}
              isPriority
              cols="4"
            />
          ) : null}

          <GameList
            icon={topIcon()}
            games={newGames}
            title="New Games"
            isPriority
            cols="5"
          />

          <Banner
            className={`banner rectangle`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="false"
          />

          <h2 className="flex items-center space-x-2 px-4 py-2 pb-0 font-semibold text-yellow-100/70 md:px-12 md:text-lg">
            <span className="text-yellow-500">{gameIcon()}</span>
            <span>
              All Games <b className="text-sm">({games.length})</b>
            </span>
          </h2>

          <InfiniteList
            games={games.slice(0, 22)}
            init={4}
            step={9}
            group={1}
          />

          <InfiniteList
            games={games.slice(22, 44)}
            init={0}
            step={4}
            group={2}
          />

          <InfiniteList
            games={games.slice(44, 66)}
            init={0}
            step={4}
            group={3}
          />

          <InfiniteList
            games={games.slice(66, 88)}
            init={0}
            step={4}
            group={4}
          />

          <InfiniteList
            games={games.slice(88, 110)}
            init={0}
            step={4}
            group={5}
          />

          <InfiniteList
            games={games.slice(110, 132)}
            init={0}
            step={4}
            group={6}
          />

          <InfiniteList
            id="group7"
            games={games.slice(132)}
            init={0}
            group={7}
          />

          <CategoryList
            icon={categoryIcon()}
            title="Categories"
            categories={categories}
          />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const data = getGames();

  const games = data.basicData;

  const newGames = games.slice(0, 20);
  const featuredGames = games.filter((game) =>
    FEATURED_GAMES.includes(game.name)
  );
  const categories = data.categories;

  return {
    props: {
      games: games.reverse(),
      newGames,
      featuredGames,
      categories,
    },
  };
};
