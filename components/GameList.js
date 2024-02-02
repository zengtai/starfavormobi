import GameListItem from "./GameListItem";
import SectionTitle from "./SectionTitle";

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
  if (games.length) {
    return (
      <>
        {title === undefined ? `` : <SectionTitle title={title} icon={icon} />}
        <ul
          className={`grid ${setCol()} gap-3 py-3 px-4 sm:grid-cols-4 md:grid-cols-6 md:gap-6 lg:grid-cols-8 2xl:grid-cols-11`}
        >
          {games.map((game, index) => (
            <GameListItem
              key={game.slug}
              game={game}
              className={className}
              isPriority={index < 6 ? true : false}
            />
          ))}
        </ul>
      </>
    );
  } else {
    return <></>;
  }
}
