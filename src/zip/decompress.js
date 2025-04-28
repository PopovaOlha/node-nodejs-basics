import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { resolve } from 'node:path';

const decompress = async () => {
    const sourcePath = resolve('src/zip/files/archive.gz');
    const destinationPath = resolve('src/zip/files/fileToCompress.txt');

    const readableStream = createReadStream(sourcePath);
    const gunzipStream = createGunzip();
    const writableStream = createWriteStream(destinationPath);

    readableStream
        .pipe(gunzipStream)
        .pipe(writableStream)
        .on('error', (error) => {
            console.error('Error during decompression:', error.message);
        });
};

await decompress();
