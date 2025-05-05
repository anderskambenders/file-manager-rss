import { resolve } from 'path';

export const up = async (pathHandler) => {
  const newPath = resolve(pathHandler.currentPath, '..');
  process.chdir(newPath);
  pathHandler.currentPath = newPath;
};