export const decodeNote = (note: string): string => {
  const noteBuffer = Buffer.from(note, 'base64')
  const noteStr = new TextDecoder().decode(noteBuffer);
  return noteStr
}
