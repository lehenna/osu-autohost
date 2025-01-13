import { createMiddleware } from "@/lib/middleware";
import { OAuth } from "@/lib/oauth";
import { UserRole } from "@/lib/user-roles";
import { findOrCreateUser } from "@/utils/find-or-create-user";

export const createUserContext = createMiddleware(async (req, res, next) => {
  if (req.url.startsWith("/oauth") || req.url.startsWith("/credentials")) {
    next();
    return;
  }
  const { osu_session } = req.cookies;
  if (!osu_session) {
    res.status(400).json({
      message: "Osu session is required.",
    });
    return;
  }
  const session = await OAuth.user(osu_session);
  if (!session) {
    res.status(400).json({
      message: "Session not found.",
    });
    return;
  }
  const user = await findOrCreateUser(session);
  req.user = {
    ...user,
    role: user.role as UserRole,
  };
  next();
});
