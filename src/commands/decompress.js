import fs from 'fs';
import zlib from 'zlib';

export const decompress = async (pathHandler ,filePath, fileDestination) => {
    const sourcePath = pathHandler.getAbsoluteIfNot(filePath);
    const destinationPath = pathHandler.getAbsoluteIfNot(fileDestination);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliDecompress();
    return new Promise((resolve, reject) => {
        readStream.pipe(brotli).pipe(writeStream)
        .on('finish', () => {
            console.log(`File ${filePath} was decompressed to ${fileDestination}`);
            resolve();
        })
        .on('error', (err) => {
            reject(err);
        });
    });
};