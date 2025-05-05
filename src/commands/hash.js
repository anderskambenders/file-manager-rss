import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export const hash = async (pathHandler ,filepath) => {
    const content = await readFile(pathHandler.getAbsoluteIfNot(filepath));
    const data = createHash('sha256').update(content);
    const hash = data.digest('hex');
    console.log(hash);
};