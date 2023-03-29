module.exports = {
  images: {
    // loader: "custom",
    // domains: ["cdn.iwantalipstick.com"],
    // disableStaticImages: true,
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: "/tmp", // 演示 2023.3.24

  // distDir: "build",

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    // return "20220517";
    // return "20220524";
    return "20230329";
    // return "20220531";
  },
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "development" ? false : true,
  },
  // assetPrefix: `./`,
};
