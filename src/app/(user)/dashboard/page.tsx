import Link from "next/link";
import { Authorize } from "@/components/authorize";
import { ListRooms } from "@/components/list-rooms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Rooms</CardTitle>
          <Authorize permission="rooms.create">
            <Button size="sm" asChild>
              <Link href="/rooms/create">Create Room</Link>
            </Button>
          </Authorize>
        </CardHeader>
        <CardContent>
          <ListRooms />
        </CardContent>
      </Card>
      <Authorize permission="users.list">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/users">Go to users dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </Authorize>
    </>
  );
}
