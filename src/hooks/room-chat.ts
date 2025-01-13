import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import type { RoomMessage } from "@/models/room";

export function useRoomChat(roomId: number) {
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  useEffect(() => {
    socket.on("roomMessage", (raw) => {
      const message = JSON.parse(raw) as RoomMessage;
      if (message.roomId !== roomId) return;
      setMessages((messages) => {
        if (messages.find((l) => l.id === message.id)) return messages;
        return [...messages, message];
      });
    });
  }, [roomId]);
  return { messages };
}
