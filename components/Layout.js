import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SITE_META } from "../lib/constants";

export default function Layout({ title, navItems, children, isOpen, type = "" }) {
  // console.log(list);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"
        />
        <title>
          {title} | {SITE_META.NAME}
        </title>
      </Head>
      <div
        className={`${
          type === "detail"
            ? "detail bg-white"
            : "bg-gradient-to-b from-orange-500 to-white bg-fixed"
        }`}
      >
        <div
          className={`wrapper ${type === "detail" ? "bg-white" : "bg-text bg-fixed text-white/80"}`}
        >
          <Navbar isOpen={isOpen} navItems={navItems} />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
