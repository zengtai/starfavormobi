module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/games", // 2022.08.18
  // distDir: "build",

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    // return "20220517";
    // return "20220524";
    return "20220818";
    // return "20220531";
  },
  trailingSlash: true,
  // assetPrefix: `./`,
};
