export default function secondsToTime({
  duration,
  hasHours = false,
  hasMinutes = true,
  hasSeconds = true,
  hasMilliseconds = false
}) {
  var pad = function(num, size) {
      return ("000" + num).slice(size * -1);
    },
    time = parseFloat(duration).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);

  const arr = [];

  if (hasHours) {
    arr.push(pad(hours, 2));
  }
  if (hasMinutes) {
    arr.push(pad(minutes, 2));
  }
  if (hasSeconds) {
    arr.push(pad(seconds, 2));
  }
  if (hasMilliseconds) {
    arr.push(pad(milliseconds, 3));
  }

  return arr.join(":");
}
