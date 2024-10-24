import { UseModalReturn } from "@/hooks/modal";
import { createContext, useContext } from "react";

export const ModalContext = createContext({} as UseModalReturn);

export function useModalContext() {
  return useContext(ModalContext);
}
