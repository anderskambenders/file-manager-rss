import { resolve } from 'path';
import fs from 'node:fs/promises';

export const mkdir = async (pathHandler, dirname) => {
  await fs.mkdir(resolve(pathHandler.currentPath,dirname));
  console.log(`Directory ${dirname} was created`);
};