import inquirer from "inquirer";
import { WorkstationConfiguration } from "../../../types";
import { JSAML } from 'ajc-util';

export async function askAndPrintConfig(config: WorkstationConfiguration) {
  const { shouldCreate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldCreate',
      message: 'Do you want to print the config to use to create workstations laters?'
    }
  ]);

  if (shouldCreate) {
    let { dest } = await inquirer.prompt([
      {
        type: 'input',
        name: 'dest',
        message: 'Destination?',
        default: process.cwd()
      }
    ]);

    if (!dest.includes('.')) {
      dest = `${dest}/${config.project}.yaml`;
    }

    JSAML.save(config, dest);
  }
}