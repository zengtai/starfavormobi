import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "../../components/Layout";
import GameListItem from "../../components/GameListItem";
import GameDetail from "../../components/GameDetail";
import { sparkleIcon } from "../../components/Icons";

import { getGameBySlug, getGames } from "../../lib/api";
import { ADS_SLOT_ID, SITE_META } from "../../lib/constants";

const Banner = dynamic(() => import("../../components/Banner"), {
  loading: () => <div>Loading...</div>,
});

export default function Games({ game, categories, leftGames, rightGames, bottomGames }) {
  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>{`${game.title} | Play ${game.title} on ${SITE_META.NAME}`}</title>
        </Head>
        <Banner
          className={`banner mt-14 md:mt-0`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.DETAIL}
          responsive="false"
        />
        <div className="hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="__star"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            id="__arr_r"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="relative z-30 grow py-4 pt-14 md:px-12 md:py-10 md:pt-4">
          <div className="grid gap-3 md:gap-6 xl:grid-cols-12 xl:grid-rows-5">
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-3 xl:row-start-1">
              <div className="flex flex-row items-center px-4 pb-3 text-xs">
                <Link href={`/`}>Home</Link>
                <span>
                  <svg className="h-5 w-5">
                    <use xlinkHref="#__arr_r"></use>
                  </svg>
                </span>
                <Link
                  title={game.category}
                  href={`/category/${game.category
                    .toLowerCase()
                    .replace(/ /, "-")
                    .replace(/\./, "")}`}
                >
                  {game.category.toLowerCase() == ".io" ? ".IO" : game.category}
                </Link>
                <span>
                  <svg className="h-5 w-5">
                    <use xlinkHref="#__arr_r"></use>
                  </svg>
                </span>
                <span className="opacity-50">{game.title}</span>
              </div>
              <GameDetail game={game} />
            </div>
            <h3 className="flex flex-row px-4 text-lg font-semibold text-yellow-100/70 xl:sr-only">
              <span className="mr-1 text-yellow-500">{sparkleIcon()}</span>
              You may also like
            </h3>
            <div className="xl:col-span-2 xl:col-start-1 xl:row-span-5 xl:row-start-1 ">
              <ul className="grid grid-cols-5 gap-3 px-4 md:grid-cols-10 md:gap-6 md:px-0 xl:grid-cols-2">
                {/* <CustomGameList games={leftGames} /> */}
                <GameListItem games={leftGames} />
              </ul>
            </div>
            <div className="xl:col-span-2 xl:col-start-11 xl:row-span-5 xl:row-start-1">
              <ul className="grid grid-cols-5 gap-3 px-4 md:grid-cols-10 md:gap-6 md:px-0 xl:grid-cols-2">
                {/* <CustomGameList games={rightGames} /> */}
                <GameListItem games={rightGames} />
              </ul>
            </div>
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-4">
              <ul className="grid grid-cols-5 gap-3 px-4 md:grid-cols-10 md:gap-6 md:px-0 xl:grid-cols-8">
                {/* <CustomGameList games={bottomGames} /> */}
                <GameListItem games={bottomGames} />
              </ul>
            </div>
          </div>
        </div>

        <Banner
          className={`banner rectangle`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.DETAIL}
          responsive="false"
        />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const data = getGames();
  const categories = data.categories;

  let { game, relatedGames } = getGameBySlug(`${context.params.slug}`);

  return {
    props: {
      game: game[0],
      categories,
      rightGames: relatedGames.slice(0, 10),
      leftGames: relatedGames.slice(11, 21),
      bottomGames: relatedGames.slice(22, 38),
    },
  };
}

export const getStaticPaths = async () => {
  const games = getGames().basicData;
  const paths = games.map((game) => ({
    params: {
      slug: game.slug.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
