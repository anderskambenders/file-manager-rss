export const parseLine = (str) => {
  const parts = str.trim().split(' ');
  const [command, args] = parts;
  return { command, args };
}