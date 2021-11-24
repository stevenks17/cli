import { register } from "../../utils/register";
import { Command } from "commander";
import { init } from "./commands/init";
import { projects } from './commands/projects';
import {mkdirSync, existsSync} from "fs";
import {dataDir} from "../../config/app";
import {remove} from "./commands/remove";


register('ws', (program: Command) => {
  if(!existsSync(dataDir)) {
    mkdirSync(dataDir);
  }

  program.description('Workstation tool helps you set up docker environments')

  program.command('init <project>')
    .description('Initialize a new project')
    .action(init);

  program.command('projects')
    .description('Output all of the currently registered projects')
    .action(projects);

  program.command('remove <project>')
    .description('Removes reference and record of project')
    .action(remove);

  return program;
});
