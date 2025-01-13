"use client";

import { updateRoom } from "@/actions/rooms";
import { RoomForm } from "./room-form";
import { useRoomContext } from "@/context/room";

export function EditRoomForm() {
  const room = useRoomContext();
  return (
    <RoomForm
      defaultValues={room}
      submit={(values) => updateRoom(room.id, values)}
    />
  );
}
