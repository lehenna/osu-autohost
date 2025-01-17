import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { CoffeIcon } from "./icons/coffe";
import { GithubIcon } from "./icons/github";
import { CustomLink } from "./link";

export function Welcome() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-xl font-medium text-white">
          Welcome to Osu Autohost!
        </h2>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          Osu Autohost is an open source project written with TypeScript and
          NodeJS which you can review and download from our{" "}
          <CustomLink
            className="text-blue-500 transition-[color] hover:text-blue-500/80"
            href="https://github.com/lehenna/osu-autohost"
            target="_blank"
          >
            Github repository
          </CustomLink>{" "}
          completely free.
        </p>
        <p className="mb-4">
          If you like this project we would love for you to give us a star on{" "}
          <CustomLink
            className="text-blue-500 transition-[color] hover:text-blue-500/80"
            href="https://github.com/lehenna/osu-autohost"
            target="_blank"
          >
            Github
          </CustomLink>{" "}
          or if you can afford it, you can make a small donation, so we can
          continue bringing more updates.
        </p>
        <ul className="flex items-center gap-4">
          <li className="flex-1">
            <Button size="lg" variant="donation" className="w-full" asChild>
              <CustomLink
                href="https://buymeacoffee.com/lehenna"
                target="_blank"
              >
                <CoffeIcon /> Buy me a Coffe
              </CustomLink>
            </Button>
          </li>
          <li className="flex-1">
            <Button size="lg" variant="secondary" className="w-full" asChild>
              <CustomLink
                href="https://github.com/lehenna/osu-autohost"
                target="_blank"
              >
                <GithubIcon /> See on Github
              </CustomLink>
            </Button>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
