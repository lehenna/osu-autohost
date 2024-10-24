import { io } from "socket.io-client";
import { DEV_MODE } from "./consts";

export const socket = io(DEV_MODE ? "ws://localhost:4000/" : undefined);
