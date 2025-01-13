"use client";

import { Brand } from "./brand";
import { Button } from "./ui/button";
import { CustomLink } from "./link";

export function BasicNavbar({
  hideDashboardButton,
}: {
  hideDashboardButton?: boolean;
}) {
  return (
    <header className="relative flex justify-between items-center gap-4">
      <Brand />
      {!hideDashboardButton ? (
        <Button asChild>
          <CustomLink href="/dashboard">Dashboard</CustomLink>
        </Button>
      ) : null}
    </header>
  );
}
