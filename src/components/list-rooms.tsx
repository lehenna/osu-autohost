"use client";

import { useRooms } from "@/hooks/rooms";
import { RoomCard } from "./room-card";
import { Spinner } from "./ui/spinner";

export function ListRooms() {
  const { rooms, pending } = useRooms();
  if (pending) {
    return (
      <div className="flex items-center justify-center w-full h-16">
        <Spinner />
      </div>
    );
  }
  if (rooms.length === 0) {
    return (
      <>
        <h4 className="font-medium mb-4">Oh no!</h4>
        <p className="text-zinc-400">
          There are no rooms available to show at this time.
        </p>
      </>
    );
  }
  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>
          <RoomCard {...room} />
        </li>
      ))}
    </ul>
  );
}
