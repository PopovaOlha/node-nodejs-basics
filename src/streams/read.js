import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const readPath = path.join(__dirname, 'files', 'fileToRead.txt');
    try {
            const stream = createReadStream(readPath);
    
            stream.pipe(process.stdout)
    
            stream.on('error', (error) => {
                console.error('Error reading the file:', error.message);
            });
    
        } catch (error) {
            console.error(error.message);
        }
};

await read();
