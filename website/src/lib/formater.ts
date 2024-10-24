export function formatTime(time: number) {
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function secondsToString(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function msToString(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const displaySeconds = seconds % 60;
  const displayMinutes = minutes % 60;
  const displayHours = hours % 24;

  let result = "";

  if (days > 0) {
    result += `${days}d `;
  }
  if (hours > 0 || days > 0) {
    result += `${displayHours}h `;
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    result += `${displayMinutes}m `;
  }
  result += `${displaySeconds}s`;

  return result.trim();
}
