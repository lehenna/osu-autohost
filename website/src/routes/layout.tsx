import { Navbar } from "@/components/navbar";
import { GamesProvider } from "@/components/providers/games";
import { SessionProvider } from "@/components/providers/session";
import { SessionCard } from "@/components/session-card";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="relative bg-zinc-950 text-white h-screen w-screen overflow-y-auto">
      <div className="relative w-full max-w-2xl mx-auto h-full pb-20">
        <SessionProvider>
          <GamesProvider>
            <Navbar />
            <div className="relative flex flex-col px-4 flex-1">
              <SessionCard />
              <Outlet />
            </div>
          </GamesProvider>
        </SessionProvider>
      </div>
    </div>
  );
}
