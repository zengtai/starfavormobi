import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { closeIcon, menuIcon, homeIcon } from "./Icons";
import { getIcon } from "../components/Icons";

export default function Navbar({ navItems, isOpen }) {
  const router = useRouter();
  const current = router.query;
  const [isMenuOpen, setOpen] = useState(isOpen);
  function toggle() {
    setOpen(!isMenuOpen);
  }
  navItems.sort((a, b) => (a > b ? 1 : -1));

  const categoryNav = navItems.map((item) => {
    return (
      <li
        className={`my-1 basis-1/2 rounded-xl transition duration-500 ease-in-out sm:basis-1/6 md:basis-1/12 md:hover:bg-none`}
        key={item}
      >
        <Link href={`/category/${item.toLowerCase()}`}>
          <a
            className={`${
              item.toLowerCase() == current.slug
                ? `rounded-full border-white/40 text-white md:scale-125 md:border-0`
                : `border-transparent text-white/90 md:hover:scale-125`
            } delay-50 flex flex-row items-center border-2 p-2 pr-3 font-bold drop-shadow transition duration-200 hover:text-white/90 md:justify-center`}
          >
            <span className="mr-1.5">{getIcon(item.toLowerCase())}</span>
            {item}
          </a>
        </Link>
      </li>
    );
  });
  return (
    <nav className="fixed z-50 w-full border-b border-black/10 bg-black/5 drop-shadow-sm backdrop-blur backdrop-filter md:relative md:border-b-0 md:bg-transparent md:backdrop-blur-none md:backdrop-filter-none">
      <div className="z-10 block md:relative">
        <Link href={`/`}>
          <a className="lg:duration-400 absolute left-0 top-0 z-20 flex h-10 w-10 origin-center items-center justify-center rounded-full text-yellow-300 lg:top-8 lg:left-6 lg:bg-white lg:text-emerald-600 lg:transition lg:delay-75 lg:ease-in-out lg:hover:scale-125">
            {homeIcon()}
          </a>
        </Link>
        <button
          onClick={toggle}
          className="ml-auto flex h-10 w-10 items-center justify-center text-yellow-300 lg:hidden"
        >
          {!isMenuOpen ? closeIcon() : menuIcon()}
        </button>
        <div
          className={`
            ${
              !isMenuOpen ? `hidden lg:block` : `block`
            } relative z-30 p-3 md:z-10`}
        >
          <ul className="flex flex-wrap rounded-3xl bg-gradient-to-b from-yellow-500 to-amber-500 py-2 px-2 capitalize shadow-lg shadow-black/20 md:mt-2 lg:flex-nowrap lg:justify-center lg:rounded-full">
            {categoryNav}
          </ul>
        </div>
      </div>
    </nav>
  );
}
