import { Link } from "react-router-dom";
import { GameCard } from "@/components/game-card";
import { useGamesContext } from "@/context/games";

export function HomePage() {
  const { games } = useGamesContext();
  return (
    <main className="relative flex-1 flex flex-col">
      <h2 className="text-2xl font-medium flex items-center justify-between gap-4 flex-wrap mb-4">
        Games
        <Link
          className="bg-violet-500/20 text-violet-500 hover:bg-violet-500/30 rounded-md grid place-items-center transition-[background-color] text-sm font-medium px-2.5 h-8"
          to="/create"
        >
          New Game
        </Link>
      </h2>
      <section className="relative flex-1 border-2 border-dashed border-zinc-900 rounded-md p-4">
        {games.length > 0 ? (
          <div className="grid gap-4">
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="relative grid place-items-center py-8">
            <h5 className="text-2xl font-medium mb-4">NO GAMES TO SHOW</h5>
            <Link
              className="bg-violet-500/20 text-violet-500 hover:bg-violet-500/30 rounded-md grid place-items-center transition-[background-color] font-medium px-4 h-10"
              to="/create"
            >
              New Game
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
