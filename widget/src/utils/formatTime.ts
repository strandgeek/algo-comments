export const formatTime = (unix: number): string => {
  const d = new Date(unix * 1000)
  const date = d.toLocaleDateString("en-US")
  const time = d.toLocaleTimeString("en-US")
  return `${date} ${time}`
}
