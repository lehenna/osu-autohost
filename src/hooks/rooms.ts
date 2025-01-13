import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import type { Room } from "@/models/room";
import { getRooms } from "@/actions/rooms";

export function useRooms() {
  const [pending, setPending] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    (async () => {
      const rooms = await getRooms();
      setRooms(rooms);
      setPending(false);
      socket.on("roomCreated", (raw) => {
        const room = JSON.parse(raw) as Room;
        setRooms((rooms) => {
          if (rooms.find((r) => r.id === room.id)) return rooms;
          return [...rooms, room];
        });
      });
      socket.on("roomUpdated", (raw) => {
        const room = JSON.parse(raw) as Room;
        setRooms((rooms) => {
          const newRooms = [...rooms];
          const roomIndex = newRooms.findIndex((r) => r.id === room.id);
          if (roomIndex !== -1) {
            newRooms[roomIndex] = room;
          }
          return newRooms;
        });
      });
      socket.on("roomClosed", (roomId) => {
        setRooms((rooms) => {
          const newRooms = [...rooms];
          const roomIndex = newRooms.findIndex((r) => r.id === roomId);
          if (roomIndex !== -1) newRooms.splice(roomIndex, 1);
          return newRooms;
        });
      });
    })();
  }, []);
  return { rooms, pending };
}
