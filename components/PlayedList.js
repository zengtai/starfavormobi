// import { useState } from "react";
import GameList from "./GameList";

export default function PlayedList({
  title,
  games,
  icon,
  cols,
  className,
  iconClassName,
  isPriority,
}) {
  // const [playedGames, setPlayedGames] = useState(games);
  // function removeHistory() {
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem("playedGames");
  //     // setPlayedGames(null);
  //   }
  // }
  return (
    <>
      <div className="relative">
        <GameList
          icon={icon}
          className={className}
          iconClassName={iconClassName}
          title={title}
          games={games}
          isPriority={isPriority}
          cols={cols}
        />
      </div>
    </>
  );
}
