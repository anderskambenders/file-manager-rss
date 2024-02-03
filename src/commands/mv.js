import fs from 'node:fs';
import { unlink } from 'node:fs/promises';

export const mv = async (pathHandler, filePath, newFilePath) => {
    const sourcePath = pathHandler.getAbsoluteIfNot(filePath);
    const destinationPath = pathHandler.getAbsoluteIfNot(newFilePath);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    readStream.pipe(writeStream);
    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
            unlink(sourcePath)
                .then(() => {
                    console.log(`File ${sourcePath} was moved to ${destinationPath}`);
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
        writeStream.on('error', (err) => {
            reject(err);
        });
    });
};