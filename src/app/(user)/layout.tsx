import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { UserProvider } from "@/providers/user";
import { getUserByToken } from "@/utils/get-user-by-token";

export default async function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserByToken();
  if (!user) return redirect("/api/oauth/authorize");
  return (
    <UserProvider user={user}>
      <Navbar />
      <main className="relative flex flex-col gap-6">{children}</main>
    </UserProvider>
  );
}
