import { createReadStream } from 'node:fs';

export const cat = async (pathHandler, filename) => {
  const sourcePath = pathHandler.getAbsoluteIfNot(filename);
  const readStream = createReadStream(sourcePath);
  readStream.on('data', (data) => {
      process.stdout.write(data);
  });
  return new Promise((resolve, reject) => {
      readStream.on('end', () => {
          console.log(`\nFile ${sourcePath} was read`);
          resolve();
      });
      readStream.on('error', (err) => {
        reject(err);
      });
  });
};