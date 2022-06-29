import Link from "next/link";
import { getIcon } from "../components/Icons";
export default function CategoryList({ title, categories, icon }) {
  const categoryList = categories.map((category, index) => (
    <li key={index} className="mx-1 mb-2 capitalize">
      <Link href={`/category/${category.toLowerCase()}`}>
        <a className="flex flex-row rounded-full bg-amber-400 py-2 px-3 text-sm text-white shadow-md shadow-black/10 lg:hover:text-yellow-100">
          <span className="mr-1 drop-shadow">
            {getIcon(`${category.toLowerCase()}`)}
          </span>
          <span className="drop-shadow">{category}</span>
        </a>
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
          <h2 className="flex items-center space-x-2 py-2 px-4 font-semibold text-yellow-100/70 md:px-12 md:text-lg">
            <span className="text-lime-500">{icon}</span>
            <span>{title}</span>
          </h2>
          <ul className="flex flex-wrap py-2 px-4 md:px-12">{categoryList}</ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
