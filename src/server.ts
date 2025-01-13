import express from "express";
import next from "next";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

import { PORT } from "./lib/consts";
import { setup } from "./lib/setup";
import { getCredentials } from "./lib/credentials";
import { websocket } from "./lib/websocket";
import { UserRole } from "./lib/user-roles";

import { validateBanchoConnection } from "./middleware/validate-bancho-connection";
import { createUserContext } from "./middleware/create-user-context";

import { OAuthRoutes } from "./routes/oauth";
import { CredentialsRoutes } from "./routes/credentials";
import { RoomRoutes } from "./routes/rooms";
import { UsersRoutes } from "./routes/users";
import { validateUserSession } from "./middleware/validate-user-session";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        username: string;
        role: UserRole;
        banned: boolean;
      };
    }
  }
}

app.prepare().then(async () => {
  const credentials = await getCredentials();
  if (credentials) await setup(credentials);

  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(validateBanchoConnection);
  app.use(validateUserSession);
  app.use("/api", createUserContext);
  app.use("/api/oauth", OAuthRoutes);
  app.use("/api/credentials", CredentialsRoutes);
  app.use("/api/rooms", RoomRoutes);
  app.use("/api/users", UsersRoutes);
  app.get("/logout", (req, res) => {
    res.clearCookie("osu_session");
    res.redirect("/");
  });
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  const server = createServer(app);

  const io = new Server(server, {});

  websocket.on("roomCreated", (room) => {
    io.sockets.emit("roomCreated", JSON.stringify(room));
  });
  websocket.on("roomUpdated", (room) => {
    io.sockets.emit("roomUpdated", JSON.stringify(room));
  });
  websocket.on("roomMessage", (message) => {
    io.sockets.emit("roomMessage", JSON.stringify(message));
  });
  websocket.on("roomClosed", (roomId) => {
    io.sockets.emit("roomClosed", roomId);
  });
  websocket.on("userUpdated", (user) => {
    io.sockets.emit("userUpdated", JSON.stringify(user));
  });

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
