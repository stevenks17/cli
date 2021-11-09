import { run } from "@vlegm/util";
import { register } from "../utils/register";
import { Command } from "commander";
import chalk from 'chalk';

register('shell [image]', (program: Command) => {
  return program.description('Attempt to shell into an image with an auto-removing container')
    .action(shell);
});

export async function shell(image = 'ajrelic/dev:latest') {
  const cwd = process.cwd();
  console.log(`image: ${chalk.yellowBright(image)}`);
  console.log(`volume: ${chalk.yellowBright(cwd)}`);
  await run('docker', ['run', '-it', '--rm', '-v', `${cwd}:/host`, '-w', '/host', image]);
}
