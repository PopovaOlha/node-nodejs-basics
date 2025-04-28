import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { createGzip } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const inputPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = path.join(__dirname, 'files', 'archive.gz');

  const readableStream = createReadStream(inputPath);
  const writableStream = createWriteStream(outputPath);
  const gzip = createGzip();

  readableStream.pipe(gzip).pipe(writableStream);

  writableStream.on('finish', () => {
    unlink(inputPath, (err) => {
      if (err) {
        console.error('Error deleting original file:', err.message);
      } else {
        console.log('Compression complete and original file deleted.');
      }
    });
  });

  writableStream.on('error', (error) => {
    console.error('Error during compression:', error.message);
  });
};

await compress();




