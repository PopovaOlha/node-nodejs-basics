import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { createGzip } from 'node:zlib';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
    const sourceFilePath = resolve('src/zip/files/fileToCompress.txt');
    const archivePath = resolve('src/zip/files/archive.gz');

    try {
        // Сначала архивируем файл
        await pipeline(
            createReadStream(sourceFilePath),
            createGzip(),
            createWriteStream(archivePath)
        );

        console.log('Compression completed successfully!');

        // Потом удаляем оригинальный файл
        await new Promise((resolvePromise, rejectPromise) => {
            unlink(sourceFilePath, (err) => {
                if (err) {
                    rejectPromise(err);
                } else {
                    console.log('Source file deleted successfully!');
                    resolvePromise();
                }
            });
        });
    } catch (error) {
        console.error('Error during compression:', error.message);
    }
};

await compress();



