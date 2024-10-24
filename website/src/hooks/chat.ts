import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export function useGameChat(gameId: number) {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  useEffect(() => {
    socket.on("message", (raw) => {
      const data = JSON.parse(raw) as GameMessage;
      if (data.gameId !== gameId) return;
      setMessages((msgs) => {
        const newMessages = [...msgs];
        const exists = newMessages.find((msg) => msg.id === data.id);
        if (!exists) newMessages.push(data);
        return newMessages;
      });
    });
  }, [gameId]);
  return { messages };
}
