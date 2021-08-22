import inquirer from 'inquirer';

export async function getRoot(): Promise<string> {
  const { dir } = await inquirer.prompt([
    {
      type: 'input',
      name: 'dir',
      message: 'Root directory? (blank for current directory)',
      default: process.cwd()
    }
  ])

  return dir;
}