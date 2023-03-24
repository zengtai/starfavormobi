import Layout from "../../components/Layout";
import GameList from "../../components/GameList";

import { getGamesByCategory, getCategories, getGames } from "../../lib/api";
import Head from "next/head";
import { SITE_META, ADS_SLOT_ID } from "../../lib/constants";

import dynamic from "next/dynamic";
const Banner = dynamic(() => import("../../components/Banner"), {
  loading: () => <div>Loading...</div>,
});

export default function GamesListByCategory({ games, categories }) {
  // console.log(games);

  // console.log(router.query);
  // console.log({ slug });
  const categoryName = games[0].category;
  // console.log(categoryName);
  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>
            {categoryName} Games | Play {categoryName} Games on {SITE_META.NAME}
          </title>
        </Head>
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
        <Banner
          className={`banner mt-14 md:mt-0`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.CATEGORY}
          responsive="false"
        />

        <div className="grow py-4 pt-14 md:pt-4">
          <h1 className="px-4 pb-2 text-center text-xl font-semibold text-yellow-100/90 md:pb-3 md:text-3xl">
            {categoryName} Games
          </h1>
          <GameList cols="4" games={games} />
        </div>

        <Banner
          className={`banner rectangle`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.CATEGORY}
          responsive="false"
        />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const games = getGamesByCategory(`${context.params.slug}`);
  const categories = getGames().categories;

  return {
    props: {
      games,
      categories,
    },
  };
}

export const getStaticPaths = async () => {
  const categories = getGames().categories;
  const paths = categories.map((category) => ({
    params: {
      slug:
        category.toLowerCase() == "match 3"
          ? "match-3"
          : category.toLowerCase() == ".io"
          ? "io"
          : category.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
