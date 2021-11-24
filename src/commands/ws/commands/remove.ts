import chalk from 'chalk';
import {Project} from "../models/Project";

export async function remove(project: string) {
  if(!Project.has(project)) {
    console.log(`There is no project named: ${chalk.red(project)}`);
    return;
  }

  Project.remove(project);
  console.log(`${chalk.blueBright(project)} has been removed!`);
}