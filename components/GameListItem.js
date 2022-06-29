import Link from "next/link";
import Image from "./Image";

export default function GameListItem({ games, className, isPriority }) {
  return (
    <>
      {games.map((game, index) => (
        <li key={game.id} className={className}>
          <Link href={`/game/${game.slug}`}>
            <a className="lg:delay-50 lg:duration-400 group relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 lg:transition lg:ease-in-out lg:hover:origin-bottom lg:hover:scale-110 lg:hover:shadow-lg lg:hover:shadow-black/40">
              {isPriority && index < 6 ? (
                <Image
                  src={game.icon}
                  alt={game.title}
                  width={200}
                  height={200}
                  className="w-full bg-loading bg-center bg-no-repeat"
                  layout="responsive"
                  priority
                />
              ) : (
                <Image
                  src={game.icon}
                  alt={game.title}
                  width={200}
                  height={200}
                  className="w-full bg-loading bg-center bg-no-repeat"
                  layout="responsive"
                />
              )}
              <div className="absolute -bottom-[150%] hidden h-full w-full items-end justify-center text-center text-xs font-semibold sm:flex lg:group-hover:bottom-0 lg:group-hover:bg-gradient-to-t lg:group-hover:from-black lg:group-hover:to-black/0">
                <div className="h-auto w-full text-ellipsis p-2 text-center">
                  <h3 className="leading-4">{game.title}</h3>
                  <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-ml-1 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {game.stars}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </>
  );
}
