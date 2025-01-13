import { Router } from "express";
import { OAuth } from "@/lib/oauth";

const OAuthRoutes = Router();

OAuthRoutes.get("/authorize", async (req, res) => {
  const url = OAuth.redirectUrl;
  res.redirect(url);
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
  res.cookie("osu_session", token);
  res.redirect("/dashboard");
});

export { OAuthRoutes };
