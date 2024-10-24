import { useGameChat } from "@/hooks/chat";
import { ChatIcon } from "./ui/chat";
import { formatTime } from "@/lib/formater";
import { useGameContext } from "@/context/game";

export function GameChat() {
  const { id } = useGameContext();
  const { messages } = useGameChat(id);
  return (
    <article className="relative border-2 border-zinc-800 rounded-md">
      <header className="relative h-8 px-2.5 flex items-center border-b-2 border-zinc-800 bg-zinc-900">
        <h3 className="flex items-center font-medium gap-2 text-sm">
          <ChatIcon />
          CHAT
        </h3>
      </header>
      <ul className="relative p-2.5 h-[20rem] overflow-y-auto">
        {messages.map((message) => (
          <li className="text-sm" key={message.id}>
            <span className="text-zinc-500">{formatTime(message.moment)} </span>
            <span
              className={`${
                message.user.username === "BanchoBot"
                  ? "text-orange-500"
                  : "text-blue-500"
              }`}
            >
              {message.user.username}:{" "}
            </span>
            <span>{message.content}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
