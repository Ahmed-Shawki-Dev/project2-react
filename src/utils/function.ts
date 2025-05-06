export function textSlice(txt: string, max: number = 50) {
  return txt.length > max ? `${txt.slice(0, max)}...` : txt;
}
