import { resolve } from 'path';
import fs from 'node:fs/promises';

export const add = async (pathHandler, filename) => {
  const filepath = resolve(pathHandler.currentPath, filename);
  await fs.writeFile(filepath, '');
  console.log(`File ${filename} was created`);
};