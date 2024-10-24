import { GameType } from "@/api/games";
import { Link } from "react-router-dom";
import { StarIcon } from "./ui/star";
import { secondsToString } from "@/lib/formater";
import { ClockIcon } from "./ui/clock";

export function GameCard(game: GameType) {
  return (
    <article>
      <Link className="group" to={`/games/${game.id}`}>
        <h4 className="font-medium text-lg group-hover:underline">
          {game.name}
        </h4>
        <ul className="relative flex items-center gap-2.5">
          <li className="flex items-center gap-1 text-sm">
            <span>
              {game.minDiff} - {game.maxDiff}
            </span>
            <span className="text-amber-500 text-lg">
              <StarIcon />
            </span>
          </li>
          <li className="text-zinc-500">&bull;</li>
          <li className="flex items-center gap-1 text-sm">
            <span>
              {secondsToString(game.minLength)} -{" "}
              {secondsToString(game.maxLength)}
            </span>
            <span className="text-blue-500 text-lg">
              <ClockIcon />
            </span>
          </li>
        </ul>
        <p className="text-sm text-violet-500">
          {game.beatmap?.title ?? "Host selecting beatmap..."}
        </p>
      </Link>
    </article>
  );
}
