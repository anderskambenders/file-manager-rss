import { resolve } from 'path';

export const cd = async (pathHandler, destination) => {
  const newPath = resolve(pathHandler.currentPath, destination);
  process.chdir(newPath);
  pathHandler.currentPath = newPath;
};