import { Bancho } from "@/lib/bancho";
import { createMiddleware } from "@/lib/middleware";

export const validateBanchoConnection = createMiddleware(
  async (req, res, next) => {
    const banchoClientStatus = Bancho.status();
    const banchoClientIsConnected = banchoClientStatus.connected;
    if (req.url.startsWith("/api/credentials")) {
      if (banchoClientIsConnected) {
        res.redirect("/dashboard");
        return;
      }
      next();
      return;
    }
    if (!banchoClientIsConnected && req.url !== "/setup") {
      res.redirect("/setup");
      return;
    }
    if (banchoClientIsConnected && req.url === "/setup") {
      res.redirect("/dashboard");
      return;
    }
    next();
  }
);
