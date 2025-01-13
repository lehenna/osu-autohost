import { CrownIcon } from "./icons/crown";
import { CustomLink } from "./link";

export function Brand() {
  return (
    <div className="flex items-center gap-2 select-none">
      <CustomLink href="/" className="text-5xl text-blue-500">
        <CrownIcon />
      </CustomLink>
      <div>
        <CustomLink href="/">
          <h1 className="text-2xl font-semibold text-white hover:underline">
            Osu Autohost
          </h1>
        </CustomLink>
        <p className="text-xs font-medium">
          Made with ❤️ by{" "}
          <CustomLink
            className="text-rose-500 transition-[color] hover:text-rose-500/80"
            href="https://lehenna.com/"
            target="_blank"
          >
            Lehenna
          </CustomLink>
        </p>
      </div>
    </div>
  );
}
