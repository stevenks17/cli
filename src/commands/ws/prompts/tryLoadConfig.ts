import inquirer from "inquirer";
import { getDirectory } from "./getDirectory";
import { JSAML } from 'ajc-util';

export async function tryLoadConfig<Type = JSON>(project: string): Promise<Type | undefined> {
  const { shouldLoad } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldLoad',
      message: 'Use a config file?'
    }
  ]);

  if (!shouldLoad) {
    return;
  }

  let dest = await getDirectory('Source?')

  if (!dest.includes('.')) {
    dest = `${dest}/${project}.yaml`;
  }

  return JSAML.read(dest);
}