import { CreateCommandFunction } from "@/models/room";

export const abortCommand: CreateCommandFunction = (room) => {
  let votes: number[] = [];
  room.multi.lobby.on("playerLeft", ({ user }) => {
    const voteIndex = votes.findIndex((vote) => vote === user.id);
    if (voteIndex === -1) return;
    votes.splice(voteIndex, 1);
  });
  room.multi.lobby.on("playing", () => {
    votes = [];
  });
  return {
    name: "abort",
    exec: async (user) => {
      if (votes.includes(user.id)) return;
      votes.push(user.id);
      const totalVotes = votes.length;
      const requiredVotes = room.queue.length / 2 + 1;
      await room.send(`Votes to abort (${totalVotes}/${requiredVotes})`);
      if (totalVotes >= requiredVotes) {
        await room.multi.lobby.abortMatch();
      }
    },
  };
};
