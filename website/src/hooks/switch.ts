import { Dispatch, SetStateAction, useState } from "react";

export interface UseSwitchReturn {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export function useSwitch(defaultValue: boolean = false): UseSwitchReturn {
  const [active, setActive] = useState(defaultValue);
  return {
    active,
    setActive,
  };
}
