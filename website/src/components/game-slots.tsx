import { useGameContext } from "@/context/game";
import { GameSlotCard } from "./game-slot";

export function GameSlots() {
  const { slots, host, id } = useGameContext();
  return (
    <ul>
      {slots.map((slot) => (
        <li key={slot.slot}>
          <GameSlotCard
            gameId={id}
            isHost={host?.id === slot.user.id}
            {...slot}
          />
        </li>
      ))}
    </ul>
  );
}
