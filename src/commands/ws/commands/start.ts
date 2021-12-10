import chalk from 'chalk';
import { Application } from '../models/Application';
import {Project} from "../models/Project";
import { startProject } from '../services/runner';

export async function start(projectName?:string) {
  let project:Project;
  if(!projectName) {
    project = await Application.defaultProject();

    if(!project) {
      console.log(`${chalk.redBright('No')} default project set, must specify a project to start`)
      return;
    }
  } else {
    project = await Project.get(projectName);

    if(!project) {
      console.log(`There  is ${chalk.redBright('no')} project by the name: ${chalk.redBright(projectName)}`);
      return;
    }
  }

  console.log(`Starting project: ${chalk.blueBright(project.name)}`);
  return startProject(project);
}