import inquirer from "inquirer";
import { JSAML } from '@vlegm/util';
import { getDirectory } from "./getDirectory";
import { getRoot } from "../services/getRoot";

export async function tryPrintConfig(config: WorkstationConfiguration) {
  const { shouldCreate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldCreate',
      message: 'Print workstation config?'
    }
  ]);

  if (shouldCreate) {
    let dest = await getDirectory('Destination?', getRoot(config.name));
    console.log(dest);
    console.log(config.name);

    if (!dest.includes('.')) {
      dest = `${dest}/${config.name}.yaml`;
    }

    await JSAML.save(config, dest);
  }
}