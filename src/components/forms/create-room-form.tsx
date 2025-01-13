"use client";

import { createRoom } from "@/actions/rooms";
import { RoomForm } from "./room-form";

export function CreateRoomForm() {
  return <RoomForm submit={createRoom} />;
}
