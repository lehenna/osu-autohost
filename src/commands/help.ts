import { OAuth } from "@/lib/oauth";
import { CreateCommandFunction } from "@/models/room";

export const helpCommand: CreateCommandFunction = (room) => {
  return {
    name: "help",
    exec: async (user) => {
      await room.send(
        `${
          user.username
        }, You can see the commands [${OAuth.credentials.callbackUrl.replace(
          "/api/oauth/callback",
          ""
        )} here]`
      );
    },
  };
};
