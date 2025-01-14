import { BasicNavbar } from "@/components/basic-navbar";
import { Navbar } from "@/components/navbar";
import { ReloadButton } from "@/components/reload-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProvider } from "@/providers/user";
import { UserCookie } from "@/utils/user-cookie";
import { cookies } from "next/headers";

export default async function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userCookie = (await cookies()).get("user");
  if (!userCookie)
    return (
      <>
        <BasicNavbar hideDashboardButton />
        <Card>
          <CardHeader>
            <CardTitle>Oh no!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              There was an error loading the session. Please refresh the page.
            </p>
            <ReloadButton />
          </CardContent>
        </Card>
      </>
    );
  const user = UserCookie.decode(userCookie.value);
  if (!user) return <></>;
  return (
    <UserProvider user={user}>
      <Navbar />
      <main className="relative flex flex-col gap-6">{children}</main>
    </UserProvider>
  );
}
