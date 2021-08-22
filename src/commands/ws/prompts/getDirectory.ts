import inquirer from 'inquirer';

export async function getDirectory(message: string): Promise<string> {
  const { dir } = await inquirer.prompt([
    {
      type: 'input',
      name: 'dir',
      message,
      default: process.cwd()
    }
  ])

  return dir;
}