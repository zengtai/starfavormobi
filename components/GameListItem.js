import getImageUrl from "@/utils/getImageUrl";
import Link from "next/link";
import Image from "next/image";

export default function GameListItem({ game, className, isPriority }) {
  return (
    <>
      <li key={game.id} className={className}>
        <Link
          href={`/game/${game?.slug}`}
          className="lg:delay-50 lg:duration-400 group relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 lg:transition lg:ease-in-out lg:hover:origin-bottom lg:hover:scale-110 lg:hover:shadow-lg lg:hover:shadow-black/40"
          title={game?.title}
        >
          <>
            {isPriority ? (
              <Image
                src={getImageUrl(game?.name)}
                alt={game.title}
                width={200}
                height={200}
                className="w-full bg-loading bg-center bg-no-repeat"
                priority
              />
            ) : (
              <Image
                src={getImageUrl(game?.name)}
                alt={game?.title}
                width={200}
                height={200}
                className="w-full bg-loading bg-center bg-no-repeat"
              />
            )}
            <div className="absolute -bottom-[150%] hidden h-full w-full items-end justify-center text-center text-xs font-semibold sm:flex lg:group-hover:bottom-0 lg:group-hover:bg-gradient-to-t lg:group-hover:from-black lg:group-hover:to-black/0">
              <div className="h-auto w-full text-ellipsis p-2 text-center">
                <h3 className="leading-4">{game.title}</h3>
                <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                  <svg className="-ml-1 h-5 w-5">
                    <use xlinkHref="#__star"></use>
                  </svg>
                  {game.stars}
                </p>
              </div>
            </div>
          </>
        </Link>
      </li>
    </>
  );
}
