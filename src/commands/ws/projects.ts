import chalk from 'chalk';
import { db } from "../../config/db";

export async function projects() {
  const projects = db.getData('root/project-names');
  
  if(!projects.length) {
    console.log(`There are ${chalk.red('no')} projects currently registered`);
  } else {
    console.log(`Projects: ${chalk.blueBright(projects.join(' '))}`)
  }
}