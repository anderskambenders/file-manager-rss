import fs from 'node:fs';

export const cp = async (pathHandler ,filePath, newFilePath) => {
    const sourcePath = pathHandler.getAbsoluteIfNot(filePath);
    const destinationPath = pathHandler.getAbsoluteIfNot(newFilePath);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    readStream.pipe(writeStream);
    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
            console.log(`File ${sourcePath} was copied to ${destinationPath}`);
            resolve();
        });
        writeStream.on('error', (err) => {
            reject(err);
        });
    });
};