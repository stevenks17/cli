import { register } from "../../utils/register";
import { Command } from "commander";
import { init } from "./init";

register('ws', (program: Command) => {
  return program.description('Workstation tool helps you set up docker environments')
    .command('init <project>')
    .action(ws);
});

export async function ws(...args: any[]) {
  const command = args[args.length - 1];

  if (command.name() === 'init') {
    const [project] = args;
    await init(project);
  }
}
