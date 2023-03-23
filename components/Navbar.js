import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { closeIcon, menuIcon, homeIcon } from "./Icons";
import Image from "next/image";
import { SITE_META } from "@/lib/constants";
import Logo from "@/public/brand/starfavor.png";
import Logo_white from "@/public/brand/starfavor_ele_white.png";
// import { getIcon } from "../components/Icons";
import categories from "@/data/categories.json";

export default function Navbar({ navItems, isOpen }) {
  const router = useRouter();
  const current = router.query;
  const [isMenuOpen, setOpen] = useState(isOpen);
  function toggle() {
    setOpen(!isMenuOpen);
  }
  // 判断是否详情页
  console.log(`router`, router);
  const isDetail = router.pathname === "/game/[slug]";
  // navItems.sort((a, b) => (a > b ? 1 : -1));

  const categoryNav = categories.data.map((item) => {
    return (
      <li
        className={`my-1 basis-1/2 rounded-xl transition duration-500 ease-in-out md:hover:bg-none lg:mx-3 lg:basis-auto`}
        key={item.slug}
      >
        <Link
          href={`/category/${item.slug}`}
          className={`${
            item.slug == current.slug
              ? `rounded-full border-white/40 ${
                  isDetail ? `text-gray-300` : `text-white`
                } md:scale-125 md:border-0`
              : `border-transparent ${
                  isDetail ? `text-gray-300/90` : `text-white/90`
                } md:hover:scale-125`
          } delay-50 flex flex-row items-center whitespace-nowrap border-2 p-2 pr-3 font-bold drop-shadow transition duration-200  md:justify-center`}
        >
          {item.name}
        </Link>
      </li>
    );
  });
  return (
    <>
      <nav>
        <div className={`z-10 mx-auto mt-8 flex items-center justify-between xl:mt-0`}>
          <Link href={`/`} passHref className="ml-4 flex items-center text-white xl:ml-12">
            <Image src={Logo} className={`w-8 xl:block xl:w-14`} alt={SITE_META.NAME} />
            {/* <Image src={Logo_white} className={`ml-3 xl:hidden`} alt={SITE_META.NAME} /> */}
            <span
              className={`${isDetail ? `text-orange-400` : `text-white`} ml-2 text-base
                font-bold xl:text-xl`}
            >
              Starfavor
            </span>
          </Link>
          <button
            onClick={toggle}
            className={`ml-auto mr-2 flex h-10 w-10 items-center justify-center ${
              isDetail ? `text-orange-400` : `text-white`
            } lg:hidden`}
          >
            {!isMenuOpen ? closeIcon() : menuIcon()}
          </button>
          <div
            className={`
            ${
              !isMenuOpen ? `hidden lg:block` : `block`
            } absolute top-20 z-50 p-3 pt-0 md:z-10 xl:static xl:p-3`}
          >
            <ul className="flex flex-wrap rounded-3xl bg-gray-600 py-2 px-2 capitalize shadow-lg md:mt-2 lg:flex-nowrap lg:shadow-none xl:bg-transparent">
              {categoryNav}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
