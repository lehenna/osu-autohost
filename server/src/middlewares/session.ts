import type { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/users";
import { getOAuthServices } from "../services/oauth";
import { blockRoles } from "../lib/block-roles";

export async function UserSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user || req.url.startsWith("/oauth")) return next();
  const { osu_session } = req.cookies;
  if (!osu_session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const oauth = await getOAuthServices();
  const osuUserInfo = await oauth.getUserInfo(osu_session);
  if (!osuUserInfo) {
    res.clearCookie("osu_session");
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const user = await UserServices.create(osuUserInfo);
  if (user) req.user = user;
  req.blockRoles = req.user ? await blockRoles(req.user) : [];
  next();
}
