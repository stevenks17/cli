import { run } from "@vlegm/util";
import { register } from "../utils/register";
import { Command } from "commander";
import chalk from 'chalk';

register('shell [image]', (program: Command) => {
  return program.description('Attempt to shell into an image with an auto-removing container')
    .action(shell);
});

export async function shell(image = 'ajrelic/dev:latest') {
  console.log(`image: ${chalk.yellowBright(image)}`);
  await run('docker', ['run', '-it', '--rm', image]);
}
