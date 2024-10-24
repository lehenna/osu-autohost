import { CloseIcon } from "./ui/close";
import { useGameForm } from "@/hooks/game-form";
import { Input } from "./ui/input";

export function GameSettings({
  cancel,
  ...defaultGame
}: Game & { cancel: () => void }) {
  const { data, handleChange, submit } = useGameForm(defaultGame, cancel);
  return (
    <article className="relative rounded-md border-2 border-zinc-800 mb-8">
      <header className="relative flex items-center justify-between h-8 px-2.5 bg-zinc-900 border-b-2 border-zinc-800">
        <h3 className="font-medium gap-2 text-sm">EDIT SETTINGS</h3>
        <button
          onClick={cancel}
          className="flex items-center gap-1 transition-[color] hover:text-red-500"
        >
          <span className="text-sm">CANCEL</span>
          <CloseIcon />
        </button>
      </header>
      <form onSubmit={submit} className="relative p-2.5">
        <h2 className="font-medium mb-1">Game name:</h2>
        <Input
          className="w-full mb-2.5"
          value={data.name}
          onChange={handleChange}
          name="name"
          placeholder="Name"
          required
        />
        <Input
          className="w-full mb-2.5"
          value={data.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
          required
        />
        <ul className="grid grid-cols-2 gap-x-4 mb-4">
          <li className="flex gap-1.5 flex-col">
            <span className="font-medium">Difficulty:</span>{" "}
            <span className="flex items-center gap-1">
              <Input
                name="minDiff"
                placeholder="Min"
                type="number"
                value={data.minDiff}
                onChange={handleChange}
                min={0}
                max={data.maxDiff - 1}
              />
              <span>-</span>
              <Input
                name="maxDiff"
                placeholder="Max"
                type="number"
                value={data.maxDiff}
                onChange={handleChange}
                min={data.minDiff + 1}
                max={20}
              />
            </span>
          </li>
          <li className="flex gap-1.5 flex-col">
            <span className="font-medium">Length:</span>{" "}
            <span className="flex items-center gap-1">
              <Input
                name="minLength"
                placeholder="Min"
                type="number"
                value={data.minLength}
                onChange={handleChange}
                min={0}
                max={data.maxLength - 1}
              />
              <span>-</span>
              <Input
                name="maxLength"
                placeholder="Max"
                type="number"
                value={data.maxLength}
                onChange={handleChange}
                min={data.minLength + 1}
              />
            </span>
          </li>
        </ul>
        <button className="text-white rounded-md grid place-items-center bg-violet-500 h-10 w-full px-4 transition-[background-color] hover:bg-violet-600">
          Save
        </button>
      </form>
    </article>
  );
}
