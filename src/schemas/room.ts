import {
  maxValue,
  minLength,
  minValue,
  number,
  object,
  pipe,
  string,
} from "valibot";

export const roomFormSchema = object({
  name: pipe(string(), minLength(2)),
  password: string(),
  gamemode: string(),
  size: string(),
});

export const roomSchema = object({
  name: pipe(string(), minLength(2)),
  password: string(),
  minDiff: number(),
  maxDiff: number(),
  minLength: number(),
  maxLength: number(),
  gamemode: pipe(number(), minValue(0), maxValue(3)),
  size: pipe(number(), minValue(2), maxValue(16)),
});
