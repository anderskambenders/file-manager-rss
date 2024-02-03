import fs from 'node:fs/promises';

export const rm = async (pathHandler ,filename) => {
    const filePath = pathHandler.getAbsoluteIfNot(filename);
    await fs.rm(filePath);
    console.log(`File was successfully removed ${filename}`);
};