import Link from "next/link";
export default function SectionTitle({ title, icon }) {
  const slug = title.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="my-2 flex items-center justify-between">
      <h2 className="flex items-center space-x-2 py-2 px-4 pb-0 font-semibold text-gray-700 md:text-lg">
        <span className={`text-gray-700`}>{icon}</span>
        <span>{title}</span>
      </h2>
      {title !== "Popular This Week" ? (
        <Link className="mr-4 text-gray-600 xl:mr-6" href={`/category/${slug.toLowerCase()}`}>
          More
        </Link>
      ) : null}
    </div>
  );
}
