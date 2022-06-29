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
        {/* <div className="absolute right-4 top-2.5">
          <button onClick={removeHistory}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div> */}
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
