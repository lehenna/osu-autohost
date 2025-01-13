import type { BeatmapDetails } from "@/utils/get-beatmap-details";
import Link from "next/link";
import { ClockIcon } from "./icons/clock";
import { StarIcon } from "./icons/star";

export function BeatmapCard(beatmap: BeatmapDetails) {
  return (
    <Link href={beatmap.downloadLink} target="_blank">
      <article className="relative w-full h-[11rem] rounded-md overflow-hidden">
        <img
          className="absolute w-full h-full object-cover brightness-50"
          src={`https://assets.ppy.sh/beatmaps/${beatmap.setId}/covers/cover.jpg`}
          alt="Beatmap background"
        />
        <div className="absolute left-0 top-0 w-full h-full p-4 flex flex-col justify-between">
          <ul className="relative flex items-center gap-2.5">
            <li className="relative w-min grid place-items-center bg-zinc-800/80 font-medium text-sm rounded-md px-2.5 h-7">
              {beatmap.status}
            </li>
            <li className="relative w-min flex items-center gap-1 bg-rose-500/80 font-medium text-sm rounded-md px-2.5 h-7">
              <ClockIcon />
              {beatmap.durationText}
            </li>
            <li className="relative w-min flex items-center gap-1 bg-cyan-500/80 font-medium text-sm rounded-md px-2.5 h-7">
              <StarIcon />
              {beatmap.difficulty}
            </li>
          </ul>
          <div>
            <h4 className="font-medium text-xl mb-2 truncate">
              {beatmap.title}
            </h4>
            <div className="flex items-center flex-wrap gap-2.5">
              <h5 className="font-medium text-xs whitespace-nowrap bg-blue-500/80 grid place-items-center rounded-md w-min h-6 px-2.5">
                {beatmap.difficultyText}
              </h5>
              <p>{beatmap.settings}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
