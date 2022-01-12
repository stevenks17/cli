import { run } from "@vlegm/utils";
import { register } from "../utils/register";
import { Command } from "commander";
import chalk from 'chalk';
import { homedir } from 'os';

register('shell [image]', (program: Command) => {
  return program.description('Attempt to shell into an image with an auto-removing container')
    .action(shell);
});

export async function shell(image = 'ajrelic/dev:latest') {
  console.log(homedir());
  return;
  const cwd = process.cwd();
  console.log(`image: ${chalk.yellowBright(image)}`);
  console.log(`volume: ${chalk.yellowBright(cwd)}`);
  await run('docker', ['run', '-it', '--rm', '-v', `${cwd}:/host`, '-w', '/host', image]);
}
