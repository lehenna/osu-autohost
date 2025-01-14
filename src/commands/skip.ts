import { CreateCommandFunction } from "@/models/room";

export const skipCommand: CreateCommandFunction = (room) => {
  let votes: number[] = [];
  room.multi.lobby.on("playerLeft", ({ user }) => {
    const voteIndex = votes.findIndex((vote) => vote === user.id);
    if (voteIndex === -1) return;
    votes.splice(voteIndex, 1);
  });
  room.multi.lobby.on("host", () => {
    votes = [];
  });
  return {
    name: "skip",
    shortname: "s",
    exec: async (user) => {
      const isHost = room.host === user.id;
      if (isHost) {
        await room.nextHost();
        return;
      }
      if (votes.includes(user.id)) return;
      votes.push(user.id);
      const totalVotes = votes.length;
      const requiredVotes = Math.trunc(room.queue.length / 2 + 1);
      await room.send(`Votes to skip (${totalVotes}/${requiredVotes})`);
      if (totalVotes >= requiredVotes) {
        await room.nextHost();
      }
    },
  };
};
