import { UserData } from "@/hooks/user";
import { createMiddleware } from "@/lib/middleware";
import { OAuth } from "@/lib/oauth";
import { findOrCreateUser } from "@/utils/find-or-create-user";
import { UserCookie } from "@/utils/user-cookie";

export const validateUserSession = createMiddleware(async (req, res, next) => {
  if (req.url.startsWith("/api") || req.url === "/" || "/setup") {
    next();
    return;
  }
  const { osu_session } = req.cookies;
  if (!osu_session) {
    res.redirect(OAuth.redirectUrl);
    return;
  }
  const session = await OAuth.user(osu_session);
  if (!session) {
    res.redirect(OAuth.redirectUrl);
    return;
  }
  const user = await findOrCreateUser(session);
  res.cookie("user", UserCookie.encode(user as UserData));
  next();
});
