import inquirer from "inquirer";
import { JSAML } from '@vlegm/utils';
import { getDirectory } from "./getDirectory";

export async function tryPrintConfig(config: WorkstationConfiguration) {
  const { shouldCreate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldCreate',
      message: 'Print workstation config?'
    }
  ]);

  if (shouldCreate) {
    let dest = await getDirectory('Destination?');

    if (!dest.includes('.')) {
      dest = `${dest}/${config.project}/workstation.yaml`;
    }

    await JSAML.save(config, dest);
  }
}