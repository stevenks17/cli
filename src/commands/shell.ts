import { run } from "ajc-util";
import { register } from "../utils/register";
import { Command } from "commander";
import chalk from 'chalk';

register('shell [image]', (program: Command) => {
  return program.description('Shell in AJ\'s dev environment')
    .action(shell);
});

export async function shell(image = 'ajrelic/dev:latest') {
  console.log(`image: ${chalk.yellowBright(image)}`);
  await run('docker', ['run', '-it', '--rm', image]);
}
