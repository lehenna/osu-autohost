import { API } from "@/lib/axios";
import type { Room, RoomOptions } from "@/models/room";

export async function getRoomById(roomId: number): Promise<Room | null> {
  try {
    const res = await API.get(`/api/rooms/${roomId}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function getRooms(): Promise<Room[]> {
  try {
    const res = await API.get(`/api/rooms`);
    return res.data;
  } catch {
    return [];
  }
}

export async function createRoom(data: RoomOptions): Promise<
  | {
      success: true;
      data: Room;
    }
  | {
      success: false;
      message: string;
    }
> {
  try {
    const res = await API.post("/api/rooms", data);
    return { success: true, data: res.data as Room };
  } catch {
    return { success: false, message: "Room limit reached." };
  }
}

export async function updateRoom(
  roomId: number,
  data: RoomOptions
): Promise<
  | {
      success: true;
      data: Room;
    }
  | {
      success: false;
      message: string;
    }
> {
  try {
    const res = await API.put(`/api/rooms/${roomId}`, data);
    return { success: true, data: res.data as Room };
  } catch {
    return { success: false, message: "Internal server error." };
  }
}

export async function closeRoom(roomId: number) {
  try {
    await API.delete(`/api/rooms/${roomId}`);
    return { success: true };
  } catch {
    return { success: false };
  }
}
