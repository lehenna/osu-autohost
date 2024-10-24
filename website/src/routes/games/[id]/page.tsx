import { GameChat } from "@/components/game-chat";
import { GameInformation } from "@/components/game-information";
import { GameSlots } from "@/components/game-slots";
import { GameProvider } from "@/components/providers/game";
import { useParams } from "react-router-dom";

export function GamePage() {
  const { id = "" } = useParams();
  return (
    <GameProvider gameId={id}>
      <GameInformation />
      <section className="relative grid md:grid-cols-5 gap-4">
        <aside className="relative md:col-span-2">
          <GameSlots />
        </aside>
        <div className="relative md:col-span-3">
          <GameChat />
        </div>
      </section>
    </GameProvider>
  );
}
