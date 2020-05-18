export default function formatMsTo24HourClock (ms) {
  const [time] = new Date(ms)
    .toUTCString()
    .match(/\d\d:\d\d/u)
  return time
}
