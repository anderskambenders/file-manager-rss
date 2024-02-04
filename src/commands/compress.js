import fs from 'node:fs';
import zlib from 'node:zlib';

export const compress = async (pathHandler, filePath, fileDestination) => {
    const sourcePath = pathHandler.getAbsoluteIfNot(filePath);
    const destinationPath = pathHandler.getAbsoluteIfNot(fileDestination);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliCompress();
    return new Promise((resolve, reject) => {
        readStream.pipe(brotli).pipe(writeStream)
        .on('finish', () => {
            console.log(`File ${filePath} was compressed to ${fileDestination}`);
            resolve();
        })
        .on('error', (err) => {
            reject(err);
        });
    });
};