import { secondsToString } from "@/lib/formater";
import { PenIcon } from "./ui/pen";
import { StarIcon } from "./ui/star";
import { ClockIcon } from "./ui/clock";
import { TeamMode, WinCondition } from "@/lib/consts";
import { useCallback, useState } from "react";
import { GameSettings } from "./game-settings";
import { CloseIcon } from "./ui/close";
import { GameClose } from "./game-close";
import { useGameContext } from "@/context/game";
import { useSessionContext } from "@/context/session";

export function GameInformation() {
  const { user: session } = useSessionContext();
  const game = useGameContext();
  const [update, setUpdate] = useState(false);
  const [close, setClose] = useState(false);
  const switchUpdate = useCallback(() => {
    setUpdate((u) => !u);
  }, []);
  const switchClose = useCallback(() => {
    setClose((u) => !u);
  }, []);
  if (update && session?.role === "admin")
    return <GameSettings {...game} cancel={switchUpdate} />;
  if (close && session?.role === "admin")
    return <GameClose name={game.name} id={game.id} cancel={switchClose} />;
  return (
    <article className="relative rounded-md border-2 border-zinc-800 mb-8">
      <header className="relative flex items-center justify-between h-8 px-2.5 bg-zinc-900 border-b-2 border-zinc-800">
        <h3 className="font-medium gap-2 text-sm">SETTINGS</h3>
        {session?.role === "admin" ? (
          <>
            <button
              onClick={switchUpdate}
              className="flex items-center gap-1 transition-[color] hover:text-violet-500"
            >
              <span className="text-sm">EDIT</span>
              <PenIcon />
            </button>
            <button
              onClick={switchClose}
              className="flex items-center gap-1 font-medium text-sm text-red-500"
            >
              CLOSE
              <CloseIcon />
            </button>
          </>
        ) : null}
      </header>
      <section className="relative p-2.5">
        <h2 className="mb-2">
          <span className="font-medium text-zinc-500">Game name:</span>{" "}
          {game.name}
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4">
          <li className="flex items-center gap-1.5">
            <span className="font-medium text-zinc-500">Difficulty:</span>{" "}
            <span className="flex items-center gap-1">
              {game.minDiff} - {game.maxDiff}
              <span className="text-amber-500">
                <StarIcon />
              </span>
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="font-medium text-zinc-500">Length:</span>
            <span className="flex items-center gap-1">
              {secondsToString(game.minLength)} -{" "}
              {secondsToString(game.maxLength)}{" "}
              <span className="text-blue-500">
                <ClockIcon />
              </span>
            </span>
          </li>
          <li>
            <span className="font-medium text-zinc-500">Status:</span>{" "}
            <span
              className={`${game.playing ? "text-green-500" : "text-cyan-500"}`}
            >
              {game.playing ? "playing" : "waiting"}
            </span>
          </li>
          <li>
            <span className="font-medium text-zinc-500">Win condition:</span>{" "}
            {WinCondition[game.winCondition as keyof typeof WinCondition]}
          </li>
          <li>
            <span className="font-medium text-zinc-500">Team mode:</span>{" "}
            {TeamMode[game.teamMode as keyof typeof TeamMode]}
          </li>
        </ul>
      </section>
    </article>
  );
}
