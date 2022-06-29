import GameListItem from "./GameListItem";

export default function GameList({
  title,
  games,
  icon,
  cols,
  className,
  iconClassName,
  isPriority,
}) {
  const setCol = () => {
    if (cols == "2") return `grid-cols-2`;
    else if (cols == "3") return `grid-cols-3`;
    else if (cols == "5") return `grid-cols-5`;
    else return `grid-cols-4`;
  };
  if (games.length != 0) {
    if (title === undefined) {
      return (
        <>
          <ul
            className={`grid ${setCol()} gap-3 px-4 py-3 sm:grid-cols-4 md:grid-cols-6 md:gap-6 md:px-12 lg:grid-cols-8 2xl:grid-cols-12`}
          >
            <GameListItem
              games={games}
              className={className}
              isPriority={isPriority}
            />
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="flex items-center space-x-2 py-2 px-4 pb-0 font-semibold text-yellow-100/70 md:px-12 md:text-lg">
            <span className={iconClassName ? iconClassName : `text-green-500`}>
              {icon}
            </span>
            <span>{title}</span>
          </h2>
          <ul
            className={`grid ${setCol()} gap-3 py-3 px-4 sm:grid-cols-4 md:grid-cols-6 md:gap-6 md:px-12 lg:grid-cols-8 2xl:grid-cols-12`}
          >
            <GameListItem
              games={games}
              className={className}
              isPriority={isPriority}
            />
          </ul>
        </>
      );
    }
  } else {
    return <></>;
  }
}
