import Link from "next/link";
import { CrownIcon } from "./icons/crown";

export function Brand() {
  return (
    <div className="flex items-center gap-2 select-none">
      <Link href="/" className="text-5xl text-blue-500">
        <CrownIcon />
      </Link>
      <div>
        <Link href="/">
          <h1 className="text-2xl font-semibold text-white hover:underline">
            Osu Autohost
          </h1>
        </Link>
        <p className="text-xs font-medium">
          Made with ❤️ by{" "}
          <Link
            className="text-rose-500 transition-[color] hover:text-rose-500/80"
            href="https://lehenna.com/"
            target="_blank"
          >
            Lehenna
          </Link>
        </p>
      </div>
    </div>
  );
}
