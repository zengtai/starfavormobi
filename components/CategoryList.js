import Link from "next/link";
import SectionTitle from "./SectionTitle";
// import { getIcon } from "../components/Icons";
export default function CategoryList({ title, categories, icon }) {
  const categoryList = categories.map((category, index) => (
    <li key={index} className="mx-1 mb-2 capitalize">
      <Link
        href={`/category/${category.toLowerCase().replace(/ /, "-").replace(/\./, "")}`}
        className="flex flex-row rounded-full bg-amber-400 py-2 px-3 text-sm text-white shadow-md shadow-black/10 lg:hover:text-yellow-100"
      >
        <>
          <span className="drop-shadow">{category}</span>
        </>
      </Link>
    </li>
  ));
  if (categories.length != 0)
    if (title === undefined) {
      return (
        <>
          <ul className="flex space-x-3 p-4">{categoryList}</ul>
        </>
      );
    } else {
      return (
        <>
          <SectionTitle title={title} icon={icon} />
          <ul className="flex flex-wrap py-2 px-4 md:px-12">{categoryList}</ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
