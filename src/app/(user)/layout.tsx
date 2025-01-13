import { Navbar } from "@/components/navbar";
import { UserProvider } from "@/providers/user";
import { UserCookie } from "@/utils/user-cookie";
import { cookies } from "next/headers";

export default async function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userCookie = (await cookies()).get("user");
  if (!userCookie) return <></>;
  const user = UserCookie.decode(userCookie.value);
  if (!user) return <></>;
  return (
    <UserProvider user={user}>
      <Navbar />
      <main className="relative flex flex-col gap-6">{children}</main>
    </UserProvider>
  );
}
