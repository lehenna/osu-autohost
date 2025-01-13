export function secondsToString(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = `${minutes.toFixed(0)}`;
  const formattedSeconds =
    remainingSeconds < 10
      ? `0${remainingSeconds.toFixed(0)}`
      : `${remainingSeconds.toFixed(0)}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}
