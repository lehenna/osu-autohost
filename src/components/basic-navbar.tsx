"use client";
import Link from "next/link";
import { Brand } from "./brand";
import { Button } from "./ui/button";

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
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : null}
    </header>
  );
}
