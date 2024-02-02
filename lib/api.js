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

async function fetchAPI(url) {
  const res = await fetch(url);
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error(`Failed to fetch API`);
  }

  return json;
}

export async function getGames() {
  const data = await fetchAPI(API_URL).then((res) => res.gamelist);

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
  let categoryNames = [];
  let categories = [];

  // 设置 title / slug / url / 格式化category
  for (const item of games) {
    let tmp = item.category;
    delete item.category;
    delete item.url;
    delete item.icon;
    delete item.isPortrait;
    delete item.full;
    delete item.isSupportPC;
    delete item.url2;
    console.log(`getGames tmp`, tmp);
    item["category"] = { name: tmp, slug: toSlug(tmp) };
    // 添加附加属性
    item["stars"] = getStars();
    item["played"] = getCount();
    item["title"] = toTitle(item.name);
    item["slug"] = toSlug(toTitle(item.name));
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
    categoryNames.push(i.category.name);
  });

  categoryNames = [...new Set(categoryNames)];

  categories = categoryNames.map((i) => ({ name: i, slug: toSlug(i) }));

  console.log(`getGames categories`, categories);
  console.log(`getGames basicData`, basicData);
  console.log(`getGames games`, games);
  return { games, basicData, categories };
}

// 首页数据（分类形式）
export const getDataForHomeByCategories = async (limit = 6) => {
  // 取所有基础数据
  const allData = await getGames();
  const basic = allData.basicData;
  const categories = allData.categories;
  const hotGames = basic.filter((i) => FEATURED_GAMES.includes(i.name)) || [];
  const data = [];
  for (const item of categories) {
    let tmp = basic.filter(
      (game) => game.category.slug === item.slug && !FEATURED_GAMES.includes(game.id)
    );
    let total = tmp.length;
    item.total = total;
    tmp = tmp.slice(0, limit);
    // 将tmp的数据复制到games
    // 删除games中各项的category属性

    let games = tmp.map((i) => {
      let game = allData.games.find((game) => game.name === i.name);
      delete game.category;
      delete game.url;
      delete game.time;
      delete game.description;
      delete game.played;
      return game;
    });

    data.push({
      category: item,
      games: games,
    });
  }
  return {
    hotGames,
    data: data.sort((a, b) => (a.category.total < b.category.total ? 1 : -1)),
    categories,
  };
};

// 按分类 slug 获取游戏
export async function getGamesByCategory(categorySlug) {
  // 拿到基础数据
  const games = await getGames().then((res) => res.basicData);
  // 按分类过滤
  return games.filter((game) => game.category.slug === categorySlug);
}

// 按游戏 slug 获取游戏详情和相关游戏
export async function getGameBySlug(slug, limit = 38) {
  // 拿全部游戏数据
  const data = await getGames();
  // 按 slug 筛选
  const game = data.games.filter((game) => game.slug == slug);
  // 从基础数据中排除当前游戏
  const relatedGames = data.basicData.filter((game) => game.slug !== slug).slice(0, limit);
  return { game, relatedGames };
}
