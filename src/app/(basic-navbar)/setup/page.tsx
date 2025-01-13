import { BasicNavbar } from "@/components/basic-navbar";
import { CredentialsForm } from "@/components/forms/credentials-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SetupPage() {
  return (
    <>
      <BasicNavbar hideDashboardButton />
      <Card>
        <CardHeader>
          <CardTitle>Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <CredentialsForm />
        </CardContent>
      </Card>
    </>
  );
}
