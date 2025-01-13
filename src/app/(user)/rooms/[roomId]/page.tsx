"use client";

import { Authorize } from "@/components/authorize";
import { BeatmapCard } from "@/components/beatmap-card";
import { CloseRoom } from "@/components/close-room";
import { ClockIcon } from "@/components/icons/clock";
import { StarIcon } from "@/components/icons/star";
import { CustomLink } from "@/components/link";
import { RoomChat } from "@/components/room-chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoomContext } from "@/context/room";
import { getOsuModeName } from "@/utils/get-osu-mode-name";
import { secondsToString } from "@/utils/seconds-to-string";

export default function RoomPage() {
  const room = useRoomContext();
  return (
    <Card>
      <CardHeader className="relative flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>{room.name}</CardTitle>
          <ul className="relative flex items-center gap-2.5">
            <li className="font-medium text-blue-500">
              osu!{getOsuModeName(room.gamemode)}
            </li>
            <li className="flex items-center gap-1.5 text-sm">
              <span className="text-amber-500">
                <StarIcon />
              </span>
              {room.minDiff} - {room.maxDiff}
            </li>
            <li className="flex items-center gap-1.5 text-sm">
              <span className="text-rose-500">
                <ClockIcon />
              </span>
              {secondsToString(room.minLength)} -{" "}
              {secondsToString(room.maxLength)}
            </li>
          </ul>
        </div>
        <Authorize permission="rooms.edit">
          <Button size="sm" asChild>
            <CustomLink href={`/rooms/${room.id}/edit`}>Edit Room</CustomLink>
          </Button>
        </Authorize>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {room.beatmap ? <BeatmapCard {...room.beatmap} /> : null}
        <section>
          <h3 className="text-lg font-medium mb-2.5 flex items-center justify-between gap-2">
            Queue{" "}
            <span className="relative text-sm bg-zinc-800 rounded-md grid place-items-center h-6 px-2">
              {room.queue.length} / {room.size}
            </span>
          </h3>
          <ul className="relative grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-4">
            {room.queue.map((user) => (
              <li className="relative w-full" key={user.id}>
                <Avatar className="w-full">
                  <AvatarImage src={`https://a.ppy.sh/${user.id}`} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-medium mb-2.5">Chat</h3>
          <RoomChat roomId={room.id} />
        </section>
        <Authorize permission="rooms.remove">
          <CloseRoom roomId={room.id} />
        </Authorize>
      </CardContent>
    </Card>
  );
}
