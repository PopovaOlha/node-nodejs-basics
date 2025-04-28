import * as os from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerFilePath = path.join(__dirname, 'worker.js');

const performCalculations = async (filePath) => {
  const baseOffset = 10;
  const cpuCores = os.cpus();

  const workers = await Promise.allSettled(
    cpuCores.map((_, i) => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(filePath, {
          workerData: baseOffset + i,
        });

        worker.on('message', (message) => resolve(message));
        worker.on('error', (error) => reject(error));
      });
    })
  );

  const results = workers.map((worker) => ({
    status: worker.status === 'fulfilled' ? 'resolved' : 'error',
    data: worker.status === 'fulfilled' ? worker.value : null,
  }));

  console.log(results);
};

await performCalculations(workerFilePath);

