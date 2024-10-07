import { spawn } from 'child_process'

const spawnChildProcess = async args => {
	const childProcess = spawn('node', ['src/cp/files/script.js', ...args], {
		stdio: 'pipe',
	})

	process.stdin.pipe(childProcess.stdin)
	childProcess.stdout.pipe(process.stdout)
	childProcess.stderr.pipe(process.stderr)

	childProcess.on('error', error => {
		console.error(`Error spawning child process: ${error.message}`)
	})

	await new Promise(resolve => {
		childProcess.on('exit', resolve)
	})
}

const argsToTest = ['--config=path/to/config.json', '--port=3000', '--debug']
await spawnChildProcess(argsToTest)
