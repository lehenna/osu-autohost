import { Router } from "express";
import { OAuth } from "@/lib/oauth";

const OAuthRoutes = Router();

OAuthRoutes.get("/authorize", (req, res) => {
  res.redirect(OAuth.redirectUrl);
});

OAuthRoutes.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    res.status(400).json({
      message: "Code is required.",
    });
    return;
  }
  const token = await OAuth.token(code as string);
  if (!token) {
    res.status(400).json({
      message: "Code is invalid.",
    });
    return;
  }
  res.cookie("osu_session", token, {
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.redirect("/dashboard");
});

export { OAuthRoutes };
