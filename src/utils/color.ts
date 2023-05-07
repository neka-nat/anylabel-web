function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

export function labelToColor(label: string): string {
  const hash = stringToHash(label);
  const hue = Math.abs(hash % 360); // 0-359 の範囲に制限
  return `hsla(${hue}, 50%, 50%, 0.5)`;
}
