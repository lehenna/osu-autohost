"use client";

import NotFound from "next/error";
import { RoomProvider } from "@/providers/room";
import { useRoom } from "@/hooks/room";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { room, pending } = useRoom();
  if (pending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-24">
          <Spinner />
        </CardContent>
      </Card>
    );
  }
  if (!room) return <NotFound statusCode={404} />;
  return <RoomProvider room={room}>{children}</RoomProvider>;
}
