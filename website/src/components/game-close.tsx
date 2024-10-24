import { FormEventHandler, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "./ui/close";
import { Input } from "./ui/input";
import { GamesAPI } from "@/api/games";

export function GameClose({
  id,
  name,
  cancel,
}: {
  id: number;
  name: string;
  cancel: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const submit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const inputName = formData.get("name")?.toString() ?? "";
      if (name !== inputName) {
        setError("Name does not match");
        return;
      }
      await GamesAPI.close(id);
      navigate("/");
    },
    [id, name, navigate]
  );
  return (
    <article className="relative rounded-md border-2 border-zinc-800 mb-8">
      <header className="relative flex items-center justify-between h-8 px-2.5 bg-zinc-900 border-b-2 border-zinc-800">
        <h3 className="font-medium gap-2 text-sm">CLOSE LOBBY</h3>
        <button
          onClick={cancel}
          className="flex items-center gap-1 transition-[color] hover:text-red-500"
        >
          <span className="text-sm">CANCEL</span>
          <CloseIcon />
        </button>
      </header>
      <form onSubmit={submit} className="relative p-2.5">
        <h3 className="font-medium mb-2">
          Are you sure you want to close this lobby?
        </h3>
        <p className="text-zinc-500 mb-4">
          Write <span className="font-medium text-white">{name}</span> below.
        </p>
        <div className="mb-4">
          <Input
            name="name"
            placeholder={name}
            required
            minLength={name.length}
          />
          {error ? (
            <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
          ) : null}
        </div>
        <button className="relative text-sm font-medium text-red-500 bg-red-500/20 hover:bg-red-500/30 transition-[background-color] rounded-md px-2.5 w-full h-10 grid place-items-center">
          CLOSE LOBBY
        </button>
      </form>
    </article>
  );
}
