export const parseLine = (str) => {
  const parts = str.trim().split(' ');
  const [command, args] = parts;
  console.log(parts)
  return { command, args };
}