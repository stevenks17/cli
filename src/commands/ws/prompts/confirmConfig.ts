import inquirer from "inquirer";
import { WorkstationConfiguration } from "../../../types";

export async function confirmConfig(config: WorkstationConfiguration) {
  console.log('Workstation Configurations:', config);

  const { shouldCreate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldCreate',
      message: 'Would you like create your workstation?'
    }
  ]);

  return shouldCreate;
}