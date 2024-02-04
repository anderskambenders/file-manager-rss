export const parseLine = (str) => {
  const parts = str.trim().split(' ');
  const command = parts[0];
  const args = parts.slice(1);
  return { command, args };
}