import { BasicNavbar } from "@/components/basic-navbar";
import { Commands } from "@/components/commands";
import { Welcome } from "@/components/welcome";

export default function Home() {
  return (
    <>
      <BasicNavbar />
      <main>
        <Welcome />
        <Commands />
      </main>
    </>
  );
}
