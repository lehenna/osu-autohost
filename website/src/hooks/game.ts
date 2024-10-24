import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GamesAPI, GameType } from "@/api/games";
import { socket } from "@/lib/socket";

export function useGame(gameId: string) {
  const [pending, setPending] = useState(true);
  const [game, setGame] = useState<GameType | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    GamesAPI.findById(parseInt(gameId))
      .then((newGame) => {
        setGame(newGame);
      })
      .catch(() => {
        setGame(null);
      })
      .finally(() => {
        setPending(false);
      });
    socket.on("update", (raw) => {
      const updatedGame = JSON.parse(raw) as GameType;
      if (updatedGame.id !== parseInt(gameId)) return;
      setGame(updatedGame);
    });
    socket.on("close", (id) => {
      if (id !== gameId) return;
      navigate("/");
    });
  }, [gameId, navigate]);
  return { game, pending };
}
