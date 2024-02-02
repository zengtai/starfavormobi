import Link from "next/link";
import Head from "next/head";
// import dynamic from "next/dynamic";

import Layout from "@/components/Layout";
import GameListItem from "@/components/GameListItem";
import GameDetail from "@/components/GameDetail";
import {
  // sparkleIcon,
  // homeIcon,
  fireIcon,
} from "@/components/Icons";

import { getGameBySlug, getGames } from "@/lib/api";
import { ADS_SLOT_ID, SITE_META } from "@/lib/constants";
// import AdSense from "@/components/AdSense";
// import AdScript from "@/components/AdScript";

// const Banner = dynamic(() => import("@/components/Banner"), {
//   loading: () => <div>Loading...</div>,
// });

export default function Games({ game, categories, leftGames, rightGames, bottomGames }) {
  return (
    <>
      <Layout type="detail">
        <Head>
          <title>{`${game.title} | Play ${game.title} on ${SITE_META.NAME}`}</title>
        </Head>
        {/* <AdScript />
        <AdSense slot={ADS_SLOT_ID.DETAIL} key={`${game.slug}-${Math.random()}}`} /> */}
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
        <div className="relative z-30 grow py-4 md:px-12 md:py-10 ">
          <div className="grid gap-3 md:gap-6 xl:grid-cols-12 xl:grid-rows-5">
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-3 xl:row-start-1">
              <div className="breadcrumb hidden flex-row items-center px-4 pb-3 text-xs text-gray-600 xl:flex">
                <Link href={`/`}>Home</Link>
                <span>
                  <svg className="h-5 w-5">
                    <use xlinkHref="#__arr_r"></use>
                  </svg>
                </span>
                <Link href={`/category/${game.category.slug}`} title={game.category.name}>
                  {game.category.name}
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
            <h3 className="flex flex-row px-4 text-lg font-semibold text-gray-700 xl:sr-only">
              <span className="mr-1 text-gray-700">{fireIcon()}</span>
              Popular Games
            </h3>
            {/* <div className="xl:col-span-2 xl:col-start-1 xl:row-span-5 xl:row-start-1 ">
              <ul className="grid grid-cols-4 gap-3 px-4 md:grid-cols-10 md:gap-6 md:px-0 xl:grid-cols-2">
                {leftGames.map((i) => (
                  <GameListItem key={i.slug} game={i} />
                ))}
              </ul>
            </div>
            <div className="xl:col-span-2 xl:col-start-11 xl:row-span-5 xl:row-start-1">
              <ul className="grid grid-cols-4 gap-3 px-4 md:grid-cols-10 md:gap-6 md:px-0 xl:grid-cols-2">
                {rightGames.map((i) => (
                  <GameListItem key={i.slug} game={i} />
                ))}
              </ul>
            </div> */}
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-4">
              <ul className="grid grid-cols-4 gap-3 px-4 text-white md:grid-cols-10 md:gap-6 md:px-0 xl:grid-cols-8">
                {bottomGames.map((i) => (
                  <GameListItem key={i.slug} game={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  let { game, relatedGames } = await getGameBySlug(`${context.params.slug}`);

  return {
    props: {
      game: game[0],

      // rightGames: relatedGames.slice(0, 10),
      // leftGames: relatedGames.slice(11, 21),
      bottomGames: relatedGames.slice(22, 38),
    },
  };
}

export const getStaticPaths = async () => {
  const games = await getGames().then((res) => res.basicData);
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
