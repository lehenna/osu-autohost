"use client";

import { useCallback } from "react";
import { Button } from "./ui/button";

export function ReloadButton() {
  const handleClick = useCallback(() => {
    window.location.reload();
  }, []);
  return <Button onClick={handleClick}>Refresh</Button>;
}
