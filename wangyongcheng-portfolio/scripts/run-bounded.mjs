import { spawn } from 'node:child_process';

// Portable build deadline for macOS hosts without GNU timeout.
const [limit, grace, command, ...args] = process.argv.slice(2);
function milliseconds(value) {
  const match = /^(\d+(?:\.\d+)?)(ms|s|m|h)?$/.exec(value ?? '');
  if (!match) throw new Error(`Invalid duration: ${value}`);
  return Number(match[1]) * ({ ms: 1, s: 1000, m: 60000, h: 3600000 }[match[2] ?? 's']);
}
const timeoutMs = milliseconds(limit);
const graceMs = milliseconds(grace);
if (!command) throw new Error('Missing command');
const child = spawn(command, args, { stdio: 'inherit', detached: true });
let timedOut = false;
let forceKill;
function signalGroup(signal) {
  try { process.kill(-child.pid, signal); } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
}
const deadline = setTimeout(() => {
  timedOut = true;
  console.error(`Build exceeded ${limit}; terminating.`);
  signalGroup('SIGTERM');
  forceKill = setTimeout(() => signalGroup('SIGKILL'), graceMs);
}, timeoutMs);
child.once('error', (error) => {
  clearTimeout(deadline);
  console.error(error.message);
  process.exitCode = 1;
});
child.once('exit', (code) => {
  clearTimeout(deadline);
  clearTimeout(forceKill);
  process.exitCode = timedOut ? 124 : (code ?? 1);
});
