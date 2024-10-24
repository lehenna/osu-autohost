import { GamesAPI } from "@/api/games";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";

export interface GameFormData {
  name: string;
  minDiff: number;
  maxDiff: number;
  minLength: number;
  maxLength: number;
  password: string;
}

export function useGameForm(defaultGame: Game, close: () => void) {
  const [data, setData] = useState<GameFormData>({
    name: defaultGame.name,
    minDiff: defaultGame.minDiff,
    maxDiff: defaultGame.maxDiff,
    minLength: defaultGame.minLength,
    maxLength: defaultGame.maxLength,
    password: defaultGame.password,
  });
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value as string;
      const name = event.target.name as string;
      if (name === "name") {
        setData((data) => ({
          ...data,
          name: value,
        }));
        return;
      }
      if (name === "password") {
        setData((data) => ({
          ...data,
          password: value,
        }));
        return;
      }
      if (name === "minDiff") {
        setData((data) => ({
          ...data,
          minDiff: parseInt(value),
        }));
        return;
      }
      if (name === "maxDiff") {
        setData((data) => ({
          ...data,
          maxDiff: parseInt(value),
        }));
        return;
      }
      if (name === "minLength") {
        setData((data) => ({
          ...data,
          minLength: parseInt(value),
        }));
        return;
      }
      if (name === "maxLength") {
        setData((data) => ({
          ...data,
          maxLength: parseInt(value),
        }));
        return;
      }
    },
    []
  );
  const submit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const newData: Partial<GameFormData> = {};
      if (data.name !== defaultGame.name) newData.name = data.name;
      if (data.minDiff !== defaultGame.minDiff) newData.minDiff = data.minDiff;
      if (data.maxDiff !== defaultGame.maxDiff) newData.maxDiff = data.maxDiff;
      if (data.minLength !== defaultGame.minLength)
        newData.minLength = data.minLength;
      if (data.maxLength !== defaultGame.maxLength)
        newData.maxLength = data.maxLength;
      if (data.password !== defaultGame.password)
        newData.password = data.password;
      await GamesAPI.update(defaultGame.id, newData);
      close();
    },
    [defaultGame, data, close]
  );
  return { data, handleChange, submit };
}
