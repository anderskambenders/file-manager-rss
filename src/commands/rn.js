import fs from 'node:fs/promises';

export const rn = async (pathHandler, oldFilename, newFilename) => {
  const oldFilePath = pathHandler.getAbsoluteIfNot(oldFilename);
  const newFilePath = pathHandler.getAbsoluteIfNot(newFilename);
  await fs.rename(oldFilePath, newFilePath);
  console.log(`File renamed from ${oldFilename} to ${newFilename}`);
};
