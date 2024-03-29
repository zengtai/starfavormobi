module.exports = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: "/webs/youle", // youle
  // basePath: "/webs/youle_1", // youle_1 2022.05.24

  // basePath: "/webs/youle_2", // youle_2 2022.05.30
  // basePath: "/webs/youle_3", // youle_2 2022.05.31
  // distDir: "build",

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    // return "20220517";
    // return "20220524";
    return "20220530";
    // return "20220531";
  },
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "development" ? false : true,
  },
  // assetPrefix: `./`,
};
