import Layout from "@/components/Layout";
import GameList from "@/components/GameList";

import {
  getGamesByCategory,
  getGames,
  // getCategories
} from "@/lib/api";
import Head from "next/head";
import { SITE_META, ADS_SLOT_ID } from "@/lib/constants";

// import dynamic from "next/dynamic";
// import AdSense from "@/components/AdSense";
// import AdScript from "@/components/AdScript";
import CategoryTitle from "@/components/CategoryTitle";
// const Banner = dynamic(() => import("@/components/Banner"), {
//   loading: () => <div>Loading...</div>,
// });

export default function GamesListByCategory({ games }) {
  // console.log(games);

  // console.log(router.query);
  // console.log({ slug });
  const categoryName = games[0].category.name;
  // console.log(categoryName);
  return (
    <>
      <Layout isOpen={false}>
        <Head>
          <title>{`${categoryName} Games | Play ${categoryName} Games on ${SITE_META.NAME}`}</title>
        </Head>
        {/* <AdScript /> */}
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
        {/* <AdSense slot={ADS_SLOT_ID.CATEGORY} key={`${categoryName}-${Math.random()}}`} /> */}

        <div className="grow py-4">
          <CategoryTitle title={categoryName} />
          <div className="xl:mx-10">
            <GameList cols="4" games={games} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const games = await getGamesByCategory(`${context.params.slug}`);
  // const categories = await getGames().then((res) => res.categories);

  return {
    props: {
      games,
      // categories,
    },
  };
}

export const getStaticPaths = async () => {
  const categories = await getGames().then((res) => res.categories);
  const paths = categories.map((category) => ({
    params: {
      slug: category.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
