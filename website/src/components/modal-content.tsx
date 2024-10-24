import { useModalContext } from "@/context/modal";

export function ModalContent({ children }: { children: React.ReactNode }) {
  const { active } = useModalContext();
  return (
    <div
      data-actived={active}
      className="fixed data-[actived=true]:grid hidden w-screen h-screen overflow-y-auto overflow-x-hidden place-items-center bg-zinc-950/70 left-0 top-0 px-4 py-12"
    >
      <article className="w-full max-w-[24rem] bg-zinc-900 rounded-md p-4">
        {children}
      </article>
    </div>
  );
}
