import { formatTime } from "@/utils/format-time";
import { useRoomChat } from "../hooks/room-chat";
import { ScrollArea } from "./ui/scroll-area";

export function RoomChat({ roomId }: { roomId: number }) {
  const { messages } = useRoomChat(roomId);
  return (
    <ScrollArea className="h-[15rem]">
      <ul className="relative">
        {messages.map((message) => (
          <li key={message.id}>
            <span className="text-zinc-500/80">
              {formatTime(message.moment)}
            </span>{" "}
            <span className="text-cyan-500">{message.user.username}:</span>{" "}
            {message.content}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
