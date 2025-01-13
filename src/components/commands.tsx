import { Card, CardContent, CardHeader } from "./ui/card";
import { CustomLink } from "./link";

interface Command {
  name: string;
  shortname?: string;
  description: string;
  example: string;
}

const commands: Command[] = [
  {
    name: "help",
    description: "Send the link to this page.",
    example: "!help",
  },
  {
    name: "start",
    description: "Create match start timer or vote to start.",
    example: "!start 15",
  },
  {
    name: "skip",
    shortname: "s",
    description: "Skip your turn or vote to skip to the current host.",
    example: "!skip",
  },
  {
    name: "stop",
    description: "Stop the start timer.",
    example: "!stop",
  },
  {
    name: "abort",
    description: "Start a vote to abort a match.",
    example: "!abort",
  },
  {
    name: "queue",
    shortname: "q",
    description: "Send the host queue.",
    example: "!queue",
  },
  {
    name: "queuepos",
    shortname: "qp",
    description: "Returns your current position in the queue.",
    example: "!qp",
  },
  {
    name: "timeleft",
    shortname: "tl",
    description: "Returns the remaining time of the current game.",
    example: "!tl",
  },
  {
    name: "rs",
    description: "Return your recent score.",
    example: "!rs",
  },
  {
    name: "bms",
    description: "Returns your best score on the current map.",
    example: "!bms",
  },
];

export function Commands() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-medium text-white">Commands</h2>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Below you will find the available commands, if you have questions or
          consider that you should add other commands, do not hesitate to{" "}
          <CustomLink
            className="text-blue-500 transition-[color] hover:text-blue-500/80"
            href="https://osu.ppy.sh/users/36780673"
            target="_blank"
          >
            contact us
          </CustomLink>{" "}
          via DM.
        </p>
        <ul className="grid gap-2.5">
          <li className="grid grid-cols-9 gap-4 text-sm font-medium text-white">
            <span className="col-span-2">Name</span>
            <span className="col-span-4">Description</span>
            <span className="col-span-3">Example</span>
          </li>
          {commands.map((command) => (
            <li className="grid grid-cols-9 gap-4" key={command.name}>
              <span className="col-span-2 flex items-center gap-1">
                <span className="rounded-sm bg-zinc-800 text-white text-xs px-2 h-6 grid place-items-center">
                  {command.name}
                </span>
                {command.shortname ? (
                  <span className="rounded-sm bg-zinc-800 text-white text-xs px-2 h-6 grid place-items-center">
                    {command.shortname}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <span className="col-span-4">{command.description}</span>
              <span className="col-span-3">{command.example}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
