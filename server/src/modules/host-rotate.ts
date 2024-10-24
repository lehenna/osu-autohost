import { GameModel } from "../models/game";

interface Votes {
  skip: string[];
  start: string[];
}

export function addHostRotateModule(game: GameModel) {
  const queue: string[] = [];
  const votes: Votes = {
    skip: [],
    start: [],
  };
  game.multi.lobby.on("playing", (playing) => {
    if (!playing) return;
    votes.start = [];
  });
  game.multi.lobby.on("host", () => {
    votes.skip = [];
  });
  function setNextHost() {
    const currentHost = queue[0];
    queue.push(currentHost);
    const nextHost = queue[1];
    game.multi.lobby.setHost(nextHost);
    queue.splice(0, 1);
  }
  game.multi.lobby.on("join", (player) => {
    queue.push(player.user.username);
    const currentHost = game.multi.lobby.host;
    if (currentHost) return;
    setNextHost();
  });
  game.multi.lobby.on("leave", (user) => {
    const index = queue.findIndex((u) => u === user.username);
    if (index === -1) return;
    queue.splice(index, 1);
    if (index !== 0) return;
    game.multi.lobby.setHost(queue[0]);
  });
  let startTime: Timer;
  let startAlert: Timer;
  game.commands.push(
    {
      name: "queue",
      shortname: "q",
      description: "Show the current auto host rotate queue.",
      run: async (player, args) => {
        game.reply(
          player.user.username,
          `Queue: ${queue.slice(0, 6).join(", ")}${
            queue.length > 6 ? "..." : ""
          }`
        );
      },
    },
    {
      name: "queuepos",
      shortname: "qp",
      description: "Show your current position in the queue.",
      run: async (player, args) => {
        game.reply(
          player.user.username,
          `Queue position: ${
            queue.findIndex((i) => i === player.user.username) + 1
          }`
        );
      },
    },
    {
      name: "autoskip",
      description: "Skip your turn automatically.",
      run: async (player, args) => {
        const autoskip = player.user.autoskip === 1 ? 0 : 1;
        await player.user.setAutoplay(autoskip);
        game.reply(
          player.user.username,
          autoskip ? "Autoskip activated" : "Autoskip disabled"
        );
      },
    },
    {
      name: "start",
      description: "initializes a start timer or starts a start vote.",
      args: "<time in seconds>",
      run: async (player, time) => {
        if (player.user.id === game.multi.lobby.host?.id) {
          if (!time) {
            game.multi.exec("!mp start");
            return;
          }
          const timeInt = parseInt(time);
          if (timeInt >= 15) {
            startAlert = setTimeout(() => {
              game.send("The match will start in 10s.");
            }, (timeInt - 10) * 1000);
          }
          startTime = setTimeout(() => {
            game.multi.exec("!mp start");
          }, timeInt * 1000);
          game.send(
            `The match will start in ${time}s. Host can use !cancel to abort.`
          );
          return;
        }
        const alreadyVote = votes.start.includes(player.user.username);
        if (alreadyVote) return;
        votes.start.push(player.user.username);
        const requiredVotes = game.multi.lobby.slots.length / 2;
        const currentVotes = votes.start.length;
        game.send(`Votes to start ${currentVotes}/${requiredVotes}`);
        if (currentVotes < requiredVotes) return;
        game.multi.exec("!mp start");
      },
    },
    {
      name: "skip",
      description:
        "Skip your turn as host or start a vote to skip the current host.",
      run: async (player, time) => {
        if (player.user.id === game.multi.lobby.host?.id) {
          setNextHost();
          return;
        }
        const alreadyVote = votes.skip.includes(player.user.username);
        if (alreadyVote) return;
        votes.skip.push(player.user.username);
        const requiredVotes = game.multi.lobby.slots.length / 2;
        const currentVotes = votes.skip.length;
        game.send(`Votes to skip ${currentVotes}/${requiredVotes}`);
        if (currentVotes < requiredVotes) return;
        setNextHost();
      },
    },
    {
      name: "cancel",
      description: "Cancels the start timer.",
      run: async (player) => {
        if (player.user.id !== game.multi.lobby.host?.id) return;
        clearTimeout(startTime);
        clearTimeout(startAlert);
      },
    }
  );
}
