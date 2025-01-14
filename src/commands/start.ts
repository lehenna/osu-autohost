import { CreateCommandFunction } from "@/models/room";

export const startCommand: CreateCommandFunction = (room) => {
  let votes: number[] = [];
  room.multi.lobby.on("playerLeft", ({ user }) => {
    const voteIndex = votes.findIndex((vote) => vote === user.id);
    if (voteIndex === -1) return;
    votes.splice(voteIndex, 1);
  });
  room.multi.lobby.on("matchStarted", () => {
    votes = [];
  });
  return {
    name: "start",
    exec: async (user, timeString) => {
      const isHost = room.host === user.id;
      if (isHost) {
        if (!timeString) {
          await room.multi.lobby.startMatch();
          return;
        }
        const time = parseInt(timeString);
        if (Number.isNaN(time)) {
          await room.send(
            `${user.username}, the start time must be an integer.`
          );
          return;
        }
        await room.setTimer(time);
        return;
      }
      if (votes.includes(user.id)) return;
      votes.push(user.id);
      const totalVotes = votes.length;
      const requiredVotes = Math.trunc(room.queue.length / 2 + 1);
      await room.send(`Votes to start (${totalVotes}/${requiredVotes})`);
      if (totalVotes >= requiredVotes) {
        await room.multi.lobby.startMatch();
      }
    },
  };
};
