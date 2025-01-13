import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { socket } from "../lib/socket";
import type { Room } from "@/models/room";
import { getRoomById } from "@/actions/rooms";

export function useRoom() {
  const router = useRouter();
  const { roomId: roomIdParams } = useParams();
  const [pending, setPending] = useState(true);
  const [room, setRoom] = useState<Room | null>(null);
  useEffect(() => {
    (async () => {
      const roomId = parseInt(roomIdParams as string);
      const room = await getRoomById(roomId);
      setRoom(room);
      setPending(false);
      if (!room) return;
      socket.on("roomUpdated", (raw) => {
        const updatedRoom = JSON.parse(raw) as Room;
        if (roomId !== updatedRoom.id) return;
        setRoom(updatedRoom);
      });
      socket.on("roomClosed", (roomId) => {
        if (roomId !== roomId) return;
        router.push("/dashboard");
      });
    })();
  }, [roomIdParams, router]);
  return { room, pending };
}
