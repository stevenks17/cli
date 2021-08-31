import { register } from "../../utils/register";
import { Command } from "commander";
import { init } from "./init";
import { projects } from './projects';

register('ws', (program: Command) => {
  program.description('Workstation tool helps you set up docker environments')
    .command('init <project>')
    .action(init);

  program.description('Output all of the currently registered projects')
    .command('projects')
    .action(projects);

  return program;
});
