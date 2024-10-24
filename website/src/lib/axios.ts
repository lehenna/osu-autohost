import axios from "axios";
import { DEV_MODE } from "./consts";

export const API = axios.create({
  baseURL: DEV_MODE ? "http://localhost:4000" : "",
  withCredentials: true,
});
