import chalk from 'chalk';
import { promises } from 'fs';
import {Project} from "../models/Project";
import { confirm } from '../prompts/confirm';
import { getRoot } from '../services/getRoot';

const {unlink} = promises;

export async function remove(name: string) {
  if(!Project.has(name)) {
    console.log(`There is no project named: ${chalk.redBright(name)}`);
    return;
  }

  const project = await Project.get(name);

  const shouldDelete = await confirm(`Are you sure you want to delete? (${chalk.redBright(name)})`);
  if(!shouldDelete) {
    console.log(`${chalk.redBright('Aborted!')}`);
    return;
  }

  await Project.remove(name);
  console.log(`${chalk.blueBright(name)} has been removed!`);

  const deleteRoot = await confirm('Would you also like to delete the project\'s directory?');
  if(deleteRoot) {
    await unlink(getRoot(project.root))
  }
}