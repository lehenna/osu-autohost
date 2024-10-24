import { Router } from "express";
import { object, string } from "valibot";
import { UserServices } from "../services/users";
import { validateRole } from "../middlewares/validate-role";
import { validateSchema } from "../lib/valibot";
import {
  affectedUserIsSameAsCurrentUser,
  userHasBlockRole,
} from "../lib/authorize";
import { Games } from "../models/games";

const routes = Router();

routes.get("/", async (req, res) => {
  const users = await UserServices.find();
  res.status(200).json(users);
});

routes.get("/me", async (req, res) => {
  if (!req.user) {
    res.status(400).json({
      message: "Unauthorized",
    });
    return;
  }
  res.status(200).json({
    ...req.user,
    blockRoles: req.blockRoles,
  });
});

routes.post("/:id/ban", validateRole("moder"), async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const user = await Games.findUser(userId);
  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });
    return;
  }
  if (
    affectedUserIsSameAsCurrentUser(user, req.user) ||
    userHasBlockRole(user, req.blockRoles ?? [])
  ) {
    res.status(403).json({
      message: "Action denied.",
    });
    return;
  }
  await user.ban();
  res.status(200).json({
    message: "Banned.",
  });
});

routes.delete("/:id/ban", validateRole("moder"), async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const user = await Games.findUser(userId);
  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });
    return;
  }
  if (
    affectedUserIsSameAsCurrentUser(user, req.user) ||
    userHasBlockRole(user, req.blockRoles ?? [])
  ) {
    res.status(403).json({
      message: "Action denied.",
    });
    return;
  }
  await user.unban();
  res.status(200).json({
    message: "Unbanned.",
  });
});

routes.put("/:id/role", async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const user = await Games.findUser(userId);
  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });
    return;
  }
  if (
    affectedUserIsSameAsCurrentUser(user, req.user) ||
    userHasBlockRole(user, req.blockRoles ?? [])
  ) {
    res.status(403).json({
      message: "Action denied.",
    });
    return;
  }
  const [errors, data] = await validateSchema(
    object({
      role: string(),
    }),
    req.body
  );
  if (errors) {
    res.status(400).json(errors);
    return;
  }
  if ("user" in user) {
    user.user.setRole(data.role as UserRole);
  } else {
    user.setRole(data.role as UserRole);
  }
  res.status(200).json({
    message: "Role updated.",
  });
});

export { routes as UserRoutes };
