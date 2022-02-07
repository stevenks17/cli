import { run } from "@vlegm/utils";
import { register } from "../utils/register";
import { Command } from "commander";
import chalk from 'chalk';
import { homedir } from 'os';
import { normalize } from 'path';

register('shell [image]', (program: Command) => {
  return program.description('Attempt to shell into an image with an auto-removing container')
    .action(shell);
});

export async function shell(image = 'vlegm/dev:latest') {
  const sshDir = normalize(`${homedir()}/.ssh`);
  const cwd = process.cwd();
  console.log(`image: ${chalk.yellowBright(image)}`);
  console.log(`volume: ${chalk.yellowBright(cwd)}`);
  await run('docker', [
    'run', 
    '-it',
    '--rm',
    '-v', `${cwd}:/host`,
    '-v', `${sshDir}:/mnt/.ssh`,
    image, 'zsh'
  ]);
}
