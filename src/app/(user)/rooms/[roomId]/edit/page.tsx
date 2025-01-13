import { EditRoomForm } from "@/components/forms/edit-room-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditRoomPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Room</CardTitle>
      </CardHeader>
      <CardContent>
        <EditRoomForm />
      </CardContent>
    </Card>
  );
}
