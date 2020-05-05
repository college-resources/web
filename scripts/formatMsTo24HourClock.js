export default function (ms) {
  const [time] = new Date(ms)
    .toUTCString()
    .match(/\d\d:\d\d/u)
  return time
}
