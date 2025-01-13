import type { Room } from "@/models/room";
import { getOsuModeName } from "@/utils/get-osu-mode-name";
import { StarIcon } from "./icons/star";
import { ClockIcon } from "./icons/clock";
import { secondsToString } from "@/utils/seconds-to-string";
import { CustomLink } from "./link";

export function RoomCard(room: Room) {
  return (
    <CustomLink href={`/rooms/${room.id}`}>
      <article className="relative w-full h-[11rem] overflow-hidden group">
        <header className="relative w-full h-full">
          <img
            className="rounded-sm brightness-50 absolute w-full h-full object-cover group-hover:brightness-75 transition-[filter]"
            src={
              room.beatmap
                ? `https://assets.ppy.sh/beatmaps/${room.beatmap?.setId}/covers/cover.jpg`
                : "/beatmap.png"
            }
            alt={room.beatmap?.title ?? "Beatmap background"}
          />
        </header>
        <span className="absolute left-4 top-4 text-xs font-medium text-black bg-white rounded-md px-2 h-6 grid place-items-center w-min mb-1">
          osu!{getOsuModeName(room.gamemode)}
        </span>
        <ul className="absolute right-4 top-4 flex items-center flex-wrap gap-2.5 rounded-md bg-black/70 px-2 h-6 text-sm">
          <li className="flex items-center gap-1">
            <span className="text-amber-500">
              <StarIcon />
            </span>{" "}
            <span className="font-medium text-white">
              {room.minDiff} - {room.maxDiff}
            </span>
          </li>
          <li className="flex items-center gap-1">
            <span className="text-rose-500">
              <ClockIcon />
            </span>{" "}
            <span className="font-medium text-white">
              {secondsToString(room.minLength)} -{" "}
              {secondsToString(room.maxLength)}
            </span>
          </li>
        </ul>
        <section className="absolute left-4 bottom-4">
          <h2 className="text-white text-xl font-medium">{room.name}</h2>
          <p className="text-sm">
            {room.beatmap
              ? `${room.beatmap.title} [${room.beatmap.difficultyText}]`
              : "Changing beatmap..."}
          </p>{" "}
        </section>
      </article>
    </CustomLink>
  );
}
