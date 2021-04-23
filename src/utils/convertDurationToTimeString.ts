export function convertDurationToTimeString(duration: number): string {
  const hours = Math.floor(duration / (60 * 60));
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  let timeString: string;

  if (hours === 0) {
    timeString = [minutes, seconds]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':');
  } else {
    timeString = [hours, minutes, seconds]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':');
  }

  return timeString;
}
