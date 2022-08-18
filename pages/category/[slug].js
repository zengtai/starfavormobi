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
            {`${categoryName} Games | Play ${categoryName} Games on ${SITE_META.name}`}
          </title>
        </Head>

        <Banner
          className={`banner mt-14 md:mt-0`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.category}
          responsive="false"
        />

        <div className="grow py-4">
          <h1 className="px-4 pb-2 text-center text-xl font-semibold capitalize text-yellow-100/90 md:pb-3 md:text-3xl">
            {categoryName} Games
          </h1>
          <GameList cols="4" games={games} />
        </div>

        <Banner
          className={`banner rectangle`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.category}
          responsive="false"
        />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const games = await getGamesByCategory(`${context.params.slug}`);
  const categories = await getGames().then((res) => res.categories);

  return {
    props: {
      games,
      categories,
    },
  };
}

export const getStaticPaths = async () => {
  const categories = await getGames().then((res) => res.categories);
  const paths = categories.map((category) => ({
    params: {
      slug: category.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
