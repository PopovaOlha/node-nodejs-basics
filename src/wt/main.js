import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerFilePath = path.resolve(__dirname, 'worker.js');

const performCalculations = async () => {
  const baseOffset = 10;
  const cpuCores = os.cpus();

  const workers = cpuCores.map((_, i) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerFilePath, {
        workerData: baseOffset + i,
      });

      worker.on('message', (message) => {
        resolve({ status: 'resolved', data: message });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });
  });

  const results = await Promise.all(workers);

  console.log(results);
};

await performCalculations();


