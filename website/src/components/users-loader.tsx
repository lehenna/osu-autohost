import { Loader } from "@/components/ui/loader";

export function UsersLoader() {
  return (
    <div className="relative grid place-items-center w-full h-[10rem] text-2xl">
      <Loader />
    </div>
  );
}
