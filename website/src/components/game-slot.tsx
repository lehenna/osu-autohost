import { useCallback, useState } from "react";
import { BanIcon } from "./ui/ban";
import { CrownIcon } from "./ui/crown";
import { DoorIcon } from "./ui/door";
import { DotsIcon } from "./ui/dots";
import { UserAvatar } from "./user-avatar";
import { UsersAPI } from "@/api/users";
import { GamesAPI } from "@/api/games";
import { useSessionContext } from "@/context/session";

export function GameSlotCard(
  slot: GameSlot & { isHost: boolean; gameId: number }
) {
  const { user: session } = useSessionContext();
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = useCallback(() => {
    setShowMenu((v) => !v);
  }, []);
  const makeHost = useCallback(async () => {
    await GamesAPI.update(slot.gameId, {
      host: slot.user.username,
    });
  }, [slot.gameId, slot.user.username]);
  const kick = useCallback(async () => {
    await GamesAPI.kick(slot.gameId, slot.user.id);
  }, [slot.gameId, slot.user.id]);
  const banOrUnban = useCallback(async () => {
    if (slot.user.role === "banned") await UsersAPI.unban(slot.user.id);
    else await UsersAPI.ban(slot.user.id);
  }, [slot.user.id, slot.user.role]);
  return (
    <article className="flex items-center gap-2.5">
      <header className="flex items-center gap-2 flex-1">
        <UserAvatar
          size={45}
          userId={slot.user.id}
          username={slot.user.username}
        />
        <p className="flex items-center gap-1 font-medium">
          {slot.isHost ? (
            <span className="text-amber-500">
              <CrownIcon />
            </span>
          ) : null}
          {slot.user.username}
        </p>
      </header>
      {session?.role === "moder" || session?.role === "admin" ? (
        <div className="relative">
          <button
            onClick={handleShowMenu}
            className="w-4 h-8 text-xl grid place-items-center transition-[color] text-zinc-500 hover:text-white"
          >
            <DotsIcon />
          </button>
          <div
            data-show={showMenu}
            className="absolute pt-1 right-0 min-w-[6rem] max-w-[7.5rem] hidden data-[show=true]:block"
          >
            <menu className="relative rounded-md bg-zinc-900 border-2 border-zinc-800 p-1.5 w-full">
              {slot.isHost ? null : (
                <button
                  className="flex whitespace-nowrap items-center gap-1 text-sm rounded-md px-2 h-8 transition-[background-color] hover:bg-zinc-800 w-full"
                  onClick={makeHost}
                >
                  <CrownIcon />
                  Make Host
                </button>
              )}
              <button
                className="flex items-center gap-1 text-sm rounded-md px-2 h-8 transition-[background-color] hover:bg-zinc-800 w-full"
                onClick={kick}
              >
                <DoorIcon />
                Kick
              </button>
              <button
                className="flex items-center gap-1 text-sm rounded-md px-2 h-8 transition-[background-color] hover:bg-zinc-800 w-full"
                onClick={banOrUnban}
              >
                <BanIcon />
                {slot.user.role === "banned" ? "Unban" : "Ban"}
              </button>
            </menu>
          </div>
        </div>
      ) : null}
    </article>
  );
}
