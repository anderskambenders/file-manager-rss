import fs from 'node:fs/promises';

export const ls = async (pathHandler) => {
  const files = await fs.readdir(pathHandler.currentPath, { withFileTypes: true });
  Promise.all(files);
  const filesList = files
      .map((file) => ({
          Name: file.name,
          Type: file.isFile() ? 'file' : 'directory',
      }))
      .sort((a, b) => a.Name.localeCompare(b.Name));
  console.table(filesList);
};