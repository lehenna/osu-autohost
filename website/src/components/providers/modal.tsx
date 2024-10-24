import { ModalContext } from "@/context/modal";
import { UseModalReturn } from "@/hooks/modal";

export function Modal({
  children,
  active,
  handleHide,
  handleShow,
}: { children: React.ReactNode } & UseModalReturn) {
  return (
    <ModalContext.Provider value={{ active, handleHide, handleShow }}>
      {children}
    </ModalContext.Provider>
  );
}
