import { Loader } from "@/components/ui/loader";

export function GamePageLoader() {
  return (
    <div className="relative grid place-items-center h-20 text-2xl">
      <Loader />
    </div>
  );
}
