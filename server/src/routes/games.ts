import { Router } from "express";
import {
  boolean,
  maxValue,
  minValue,
  null_,
  number,
  object,
  optional,
  pipe,
  string,
  union,
} from "valibot";
import { Games } from "../models/games";
import { validateRole } from "../middlewares/validate-role";
import { validateSchema } from "../lib/valibot";

const routes = Router();

routes.get("/", async (req, res) => {
  const games = Games.data();
  res.status(200).json(games);
});

routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const game = Games.findById(parseInt(id));
  if (!game) {
    res.status(404).json({
      message: "Game not found.",
    });
    return;
  }
  res.status(200).json(game.data());
});

routes.post("/", async (req, res) => {
  const [errors, data] = await validateSchema(
    object({
      name: string(),
      hostRotate: optional(boolean()),
      password: string(),
    }),
    req.body
  );
  if (errors) {
    res.status(400).json(errors);
    return;
  }
  const game = await Games.create(data);
  res.status(200).json(game.data());
});

routes.post("/:id/kick", validateRole("moder"), async (req, res) => {
  const { id } = req.params;
  const gameId = parseInt(id);
  const game = Games.findById(gameId);
  if (!game) {
    res.status(404).json({
      message: "Game not found.",
    });
    return;
  }
  const [errors, data] = await validateSchema(
    object({
      userId: number(),
    }),
    req.body
  );
  if (errors) {
    res.status(400).json(errors);
    return;
  }
  game.multi.exec(`!mp kick #${data.userId}`);
  res.status(200).json({
    message: "success",
  });
});

routes.patch("/:id", validateRole("admin"), async (req, res) => {
  const { id } = req.params;
  const gameId = parseInt(id);
  const game = Games.findById(gameId);
  if (!game) {
    res.status(404).json({
      message: "Game not found.",
    });
    return;
  }
  const [errors, data] = await validateSchema(
    object({
      minDiff: optional(pipe(number(), minValue(0))),
      maxDiff: optional(pipe(number(), maxValue(0))),
      minLength: optional(pipe(number(), minValue(0))),
      maxLength: optional(pipe(number(), maxValue(0))),
      name: optional(string()),
      password: optional(string()),
      beatmap: optional(number()),
      winCondition: optional(number()),
      teamMode: optional(number()),
      host: optional(union([string(), null_()])),
    }),
    req.body
  );
  if (errors) {
    res.status(400).json(errors);
    return;
  }
  if (data.host !== undefined) game.multi.lobby.setHost(data.host);
  if (data.beatmap) game.multi.lobby.setMap(data.beatmap);
  if (typeof data.minDiff === "number") game.setMinDiff(data.minDiff);
  if (typeof data.maxDiff === "number") game.setMaxDiff(data.maxDiff);
  if (typeof data.minLength === "number") game.setMinLength(data.minLength);
  if (typeof data.maxLength === "number") game.setMaxLength(data.maxLength);
  if (data.name) game.multi.lobby.setName(data.name);
  if (data.password) game.multi.lobby.setPassword(data.password);
  if (typeof data.winCondition === "number")
    game.multi.lobby.setWinCondition(data.winCondition);
  if (typeof data.teamMode === "number")
    game.multi.lobby.setWinCondition(data.teamMode);
  res.status(200).json({
    message: "Updated.",
  });
});

routes.delete("/:id", validateRole("admin"), async (req, res) => {
  const { id } = req.params;
  const gameId = parseInt(id);
  const game = Games.findById(gameId);
  if (!game) {
    res.status(404).json({
      message: "Game not found.",
    });
    return;
  }
  await game.multi.lobby.close();
  res.status(200).json({
    message: "Deleted.",
  });
});

export { routes as GameRoutes };
