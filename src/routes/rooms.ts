import { Router } from "express";
import { partial } from "valibot";
import { createController } from "@/lib/controller";
import { validateSchema } from "@/lib/validate-schema";
import { validateUserPermission } from "@/middleware/validate-user-permission";
import { roomSchema } from "@/schemas/room";
import { RoomServices } from "@/services/room";

const RoomRoutes = Router();

RoomRoutes.get(
  "/",
  validateUserPermission("rooms.list"),
  createController(async (req, res) => {
    const rooms = await RoomServices.find();
    res.status(200).json(rooms);
  })
);

RoomRoutes.post(
  "/",
  validateUserPermission("rooms.create" as never),
  createController(async (req, res) => {
    const data = await validateSchema(roomSchema, req.body);
    const room = await RoomServices.create({
      name: data.name,
      password: data.password,
      gamemode: data.gamemode,
      minDiff: data.minDiff,
      maxDiff: data.maxDiff,
      minLength: data.minLength,
      maxLength: data.maxLength,
      size: data.size,
    });
    res.status(201).json(room);
  })
);

RoomRoutes.get(
  "/:roomId",
  validateUserPermission("rooms.list" as never),
  createController(async (req, res) => {
    const roomId = parseFloat(req.params.roomId);
    const room = await RoomServices.findById(roomId);
    if (!room) {
      res.status(404).json({
        message: "Room not found.",
      });
      return;
    }
    res.status(200).json(room);
  })
);

RoomRoutes.put(
  "/:roomId",
  validateUserPermission("rooms.update" as never),
  createController(async (req, res) => {
    const roomId = parseFloat(req.params.roomId);
    const data = await validateSchema(partial(roomSchema), req.body);
    const room = await RoomServices.update(roomId, data);
    res.status(200).json(room);
  })
);

RoomRoutes.delete(
  "/:roomId",
  validateUserPermission("rooms.remove" as never),
  createController(async (req, res) => {
    const roomId = parseFloat(req.params.roomId);
    await RoomServices.remove(roomId);
    res.status(200).json({
      message: "Room removed.",
    });
  })
);

export { RoomRoutes };
