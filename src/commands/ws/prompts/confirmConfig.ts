import inquirer from "inquirer";

export async function confirmConfig(config: any, message: string) {
  console.log('Workstation Configurations:', config);

  const { shouldCreate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldCreate',
      message
    }
  ]);

  return shouldCreate;
}