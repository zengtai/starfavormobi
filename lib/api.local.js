import { API_URL, FEATURED_GAMES, GAME_PATH } from "./constants";
import { SELECTED_GAMES, EXCLUDED_GAMES } from "./constants";

import getCount from "@/utils/getCount";
import getRange from "@/utils/getRange";
import getStars from "@/utils/getStars";
import toSlug from "@/utils/toSlug";
import toTitle from "@/utils/toTitle";
// import toCapitalize from "@/utils/toCapitalize";
// import getImageUrl from "@/utils/getImageUrl";
// import getGameUrl from "@/utils/getGameUrl";

import localData from "@/data/games.json";
import categoryData from "@/data/categories.json";

// async function fetchAPI(url) {
//   const res = await fetch(url);
//   const json = await res.json();

//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error(`Failed to fetch API`);
//   }

//   return json;
// }

export function getGames() {
  // const data = await fetchAPI(API_URL).then((res) => res.gamelist);
  const data = localData.gamelist;

  // 默认按日期排序
  let games = data.slice().sort((a, b) => (new Date(a.time) < new Date(b.time) ? 1 : -1));

  // 如存在要筛选的游戏
  if (SELECTED_GAMES.length !== 0) {
    games = games.filter((game) => SELECTED_GAMES.includes(game.name));
  }

  // 如存在要排除的游戏
  if (EXCLUDED_GAMES.length !== 0) {
    games = games.filter((game) => !EXCLUDED_GAMES.includes(game.name));
  }

  let basicData = [];

  // 设置 title / slug / url / 格式化category
  for (const item of games) {
    let tmp = item.category;
    item["category"] = { name: tmp, slug: toSlug(tmp) };
    // 添加附加属性
    item["stars"] = getStars();
    item["played"] = getCount();
  }
  // 生成包含基础属性的数组
  games.map((i) => {
    // 写入数组
    basicData.push({
      // id: i.id,
      title: i.title,
      slug: i.slug,
      name: i.name,
      stars: i.stars,
      category: i.category,
    });
  });
  console.log(`getGames basicData`, basicData);
  console.log(`getGames games`, games);
  return { games, basicData };
}

// 首页数据（分类形式）
export const getDataForHomeByCategories = (limit = 6) => {
  // 取所有基础数据
  const allData = getGames();
  const basic = allData.basicData;
  const categories = categoryData.data;
  const hotGames = basic.filter((i) => FEATURED_GAMES.includes(i.name)) || [];
  const data = [];
  for (const item of categories) {
    const tmp = basic.filter((game) => game.category.slug === item.slug).slice(0, limit);
    delete tmp.category;
    data.push({
      category: item,
      games: tmp,
    });
  }
  return {
    hotGames,
    data: data.sort((a, b) => (a.games.length < b.games.length ? 1 : -1)),
    categories,
  };
};

// 按分类 slug 获取游戏
export function getGamesByCategory(categorySlug) {
  // 拿到基础数据
  const games = getGames().then((res) => res.basicData);
  // 按分类过滤
  return games.filter((game) => game.category.slug === categorySlug);
}

// 按游戏 slug 获取游戏详情和相关游戏
export function getGameBySlug(slug, limit = 38) {
  // 拿全部游戏数据
  const data = getGames();
  // 按 slug 筛选
  const game = data.games.filter((game) => game.slug == slug);
  // 从基础数据中排除当前游戏
  const relatedGames = data.basicData.filter((game) => game.slug !== slug).slice(0, limit);
  return { game, relatedGames };
}
