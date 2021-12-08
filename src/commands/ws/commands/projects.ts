import chalk from 'chalk';
import { normalize } from 'path';
import { run } from '@vlegm/util';
import {Project} from "../models/Project";

export async function projects() {
  const projects = await Project.names();
  
  if(!projects.length) {
    console.log(`There are ${chalk.redBright('no')} projects currently registered`);
  } else {
    console.log(`Projects: ${chalk.blueBright(projects.join(' '))}`)
  }
}