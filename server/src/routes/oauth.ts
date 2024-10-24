import { Router } from "express";
import { getOAuthServices } from "../services/oauth";

const OAuthRoutes = Router();

OAuthRoutes.get("/authorize", async (req, res) => {
  const oauth = await getOAuthServices();
  const url = oauth.getAuthorizationUrl();
  res.redirect(url);
});

OAuthRoutes.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code || Array.isArray(code)) {
    res.status(400).json({
      message: "Code is required.",
    });
    return;
  }
  const oauth = await getOAuthServices();
  const token = await oauth.getToken(code as string);
  if (!token) {
    res.status(400).json({
      message: "Invalid code.",
    });
    return;
  }
  res.cookie("osu_session", token);
  res.redirect("/");
});

OAuthRoutes.get("/logout", (req, res) => {
  res.clearCookie("osu_session");
  res.redirect("/");
});

export { OAuthRoutes };
