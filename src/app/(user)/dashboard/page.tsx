import { Authorize } from "@/components/authorize";
import { ListRooms } from "@/components/list-rooms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomLink } from "@/components/link";

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Rooms</CardTitle>
          <Authorize permission="rooms.create">
            <Button size="sm" asChild>
              <CustomLink href="/rooms/create">Create Room</CustomLink>
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
              <CustomLink href="/users">Go to users dashboard</CustomLink>
            </Button>
          </CardContent>
        </Card>
      </Authorize>
    </>
  );
}
