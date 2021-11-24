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
    .command('init <project>')
    .action(init);

  program.description('Output all of the currently registered projects')
    .command('projects')
    .action(projects);

  program.description('Removes reference and record of project')
    .command('remove <project>')
    .action(remove);

  return program;
});
