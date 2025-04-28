import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { createGunzip } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const inputPath = path.join(__dirname, 'files', 'archive.gz');
  const outputPath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const readableStream = createReadStream(inputPath);
  const writableStream = createWriteStream(outputPath);
  const gunzip = createGunzip();

  readableStream.pipe(gunzip).pipe(writableStream);

  writableStream.on('finish', () => {
    unlink(inputPath, (err) => {
      if (err) {
        console.error('Error deleting archive:', err.message);
      } else {
        console.log('Decompression complete and archive deleted.');
      }
    });
  });

  writableStream.on('error', (error) => {
    console.error('Error during decompression:', error.message);
  });
};

await decompress();


