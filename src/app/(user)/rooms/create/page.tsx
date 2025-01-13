import { CreateRoomForm } from "@/components/forms/create-room-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateRoomPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Room</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateRoomForm />
      </CardContent>
    </Card>
  );
}
