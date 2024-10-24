import { createServer } from "http";
import express, { Router } from "express";
import cors from "cors";
import cookies from "cookie-parser";
import { Server } from "socket.io";
import morgan from "morgan";
import { join } from "path";

import { migrateDatabase } from "./lib/migrate";
import { UserSession } from "./middlewares/session";
import { DEV_MODE, PORT } from "./lib/consts";
import { OAuthRoutes } from "./routes/oauth";
import { GameRoutes } from "./routes/games";
import { UserRoutes } from "./routes/users";
import { Games } from "./models/games";
import { createBanchoClient } from "./lib/bancho";

// setInterval(() => {}, 1000);

const corsOptions = DEV_MODE
  ? {
      origin: "http://localhost:5173",
      credentials: true,
    }
  : undefined;

const PUBLIC_FOLDER = join(process.cwd(), "public");

(async () => {
  await migrateDatabase();
  await createBanchoClient();

  const app = express();

  app.use(morgan("dev"));

  const router = Router();

  router.use(cors(corsOptions));
  router.use(express.json());
  router.use(cookies());
  router.use(UserSession);
  router.use("/oauth", OAuthRoutes);
  router.use("/games", GameRoutes);
  router.use("/users", UserRoutes);

  app.use("/api", router);

  app.use(express.static(PUBLIC_FOLDER));
  app.get("*", (req, res) => {
    res.sendFile(join(PUBLIC_FOLDER, "index.html"));
  });

  const server = createServer(app);
  const io = new Server(server, {
    cors: corsOptions,
  });

  const room = "osu-autohost";

  io.on("connection", (socket) => {
    socket.join(room);
    socket.on("disconnect", () => {
      socket.leave(room);
    });
  });

  Games.on("update", (game) => {
    io.to(room).emit("update", JSON.stringify(game.data()));
  });

  Games.on("message", (data) => {
    io.to(room).emit("message", JSON.stringify(data));
  });

  Games.on("close", (game) => {
    io.to(room).emit("close", game.multi.id.toString());
  });

  server.listen(PORT, () => {
    console.log(`> Server listening at http://localhost:${PORT}`);
  });
})();
