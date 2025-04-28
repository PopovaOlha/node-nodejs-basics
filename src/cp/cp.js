import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = 'files/script.js';
const sourceFilePath = path.join(__dirname, sourceFile);

const spawnChildProcess = async (filePath, args) => {
  const argsToPass = args ?? [];

  spawn('node', [filePath, ...argsToPass], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });
};

await spawnChildProcess(sourceFilePath, ['arg1', 'arg2']);


