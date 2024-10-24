import { useCallback, useState } from "react";

export interface UseModalReturn {
  active: boolean;
  handleShow: () => void;
  handleHide: () => void;
}

export function useModal(): UseModalReturn {
  const [active, setActive] = useState(false);
  const handleShow = useCallback(() => {
    setActive(true);
  }, []);
  const handleHide = useCallback(() => {
    setActive(false);
  }, []);
  return { active, handleShow, handleHide };
}
