import Head from "next/head";
import {
  Fragment,
  // useEffect,
  // useState
} from "react";
import {
  fireIcon,
  // topIcon,
  // gameIcon,
  // categoryIcon,
  // historyIcon,
  getIcon,
} from "../components/Icons";
import {
  getDataForHomeByCategories,
  // getGames
} from "@/lib/api";

import Layout from "@/components/Layout";
import {
  ADS_SLOT_ID,
  SITE_META,
  // FEATURED_GAMES
} from "@/lib/constants";
import GameList from "../components/GameList";
// import PlayedList from "../components/PlayedList";
// import CategoryList from "../components/CategoryList";

// import dynamic from "next/dynamic";
import SectionTitle from "@/components/SectionTitle";
import AdSense from "@/components/AdSense";
import GameListItem from "@/components/GameListItem";
import AdScript from "@/components/AdScript";

// const Banner = dynamic(() => import("../components/Banner"), {
//   loading: () => <div>Loading...</div>,
// });

// const InfiniteList = dynamic(() => import("../components/InfiniteList"), {
//   loading: () => <div>Loading...</div>,
// });

export default function Home({
  data,
  featuredGames,
  // allData
}) {
  // console.log(`allData: `, JSON.stringify(allData.games));
  // const [playedGames, setPlayedGames] = useState();
  // useEffect(() => {
  //   let playedGamesBySlug;
  //   if (typeof window !== "undefined") {
  //     let playedGames = JSON.parse(localStorage.getItem("playedGames")) || [];
  //     if (playedGames.length) {
  //       playedGamesBySlug = data.filter((game) => playedGames.includes(game.slug));
  //       setPlayedGames(() => playedGamesBySlug);
  //     }
  //   }
  // }, [data]);

  console.log(`data: `, data);
  return (
    <>
      <Layout>
        <Head>
          <title>{`${SITE_META.NAME} | Play Free Games Online`}</title>
        </Head>
        {/* <AdScript /> */}
        <div className="relative z-30 grow">
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

          {/* <AdSense slot={ADS_SLOT_ID.HOME} key={`Home-${Math.random()}}`} /> */}

          <div className="xl:mx-8">
            <GameList
              icon={fireIcon()}
              iconClassName="text-orange-500"
              title="Popular This Week"
              games={featuredGames}
              isPriority
              cols="3"
            />
          </div>

          <div className="grid gap-x-8 xl:mx-8 xl:mb-8 xl:grid-cols-3">
            {data
              // .sort((a, b) => (a.games.length < b.games.length ? 1 : -1))
              .map((i, index) => {
                return (
                  <Fragment key={i.category.slug}>
                    <section>
                      <SectionTitle
                        title={i.category.name}
                        icon={getIcon(i.category.slug, `text-gray-600`)}
                      />
                      <ul className="mx-4 my-3 grid grid-cols-4 gap-4 ">
                        {i.games.map((j) => (
                          <GameListItem
                            game={j}
                            key={`${j.id}`}
                            isPriority={index < 3 ? true : false}
                          />
                          // <li key={j.id}>{j.title}</li>
                        ))}
                      </ul>
                    </section>
                    {/* {index === 0 ? (
                      <AdSense slot={ADS_SLOT_ID.HOME} key={`Home-${Math.random()}}`} />
                    ) : null} */}
                  </Fragment>
                );
              })}
          </div>
          <div className="about-us">
            <h2 className="">About Game Center</h2>
            <div className="content text-gray-600">
              <p>Fun, free games at our Game Center!</p>
              <p>If you have the time you can indulge in a world of games.</p>
              <p>
                At Game Center, we believe that everyone can have a great online gaming experience,
                regardless of their financial situation. That&apos;s why we offer tons of free
                games, ensuring that everyone has the opportunity to enjoy the fun and excitement of
                gaming without breaking the bank.
              </p>
              <p>If you have the time you can indulge in the world of gaming.</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  // const allData = await getGames();

  // const games = data.basicData;

  // const newGames = games.slice(0, 20);
  // const featuredGames = games.filter((game) => FEATURED_GAMES.includes(game.name));
  // const categories = data.categories;

  const data = await getDataForHomeByCategories(8);

  console.log(`home data`, data);

  return {
    props: {
      data: data.data,
      featuredGames: data.hotGames,
      // allData,
    },
  };
};
