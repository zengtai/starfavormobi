import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SITE_META } from "../lib/constants";

export default function Layout({ title, navItems, children, isOpen }) {
  // console.log(list);

  return (
    <div className="flex min-h-screen flex-col bg-fixed text-sm text-white/80">
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"
        />
        <title>
          {title} | {SITE_META.name}
        </title>
      </Head>

      <Navbar isOpen={isOpen} navItems={navItems} />
      {children}
      <Footer />
    </div>
  );
}
