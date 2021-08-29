import inquirer from 'inquirer';

async function shouldAddEnv() {
  const { shouldAdd } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldAdd',
      message: 'Add environment variables?'
    }
  ]);

  return shouldAdd;
}

export async function getEnv(answers: string[] = []): Promise<Dict<string> | undefined> {
  if (!await shouldAddEnv()) {
    return undefined;
  }

  const { env } = await inquirer.prompt([
    {
      type: 'editor',
      name: 'env',
    }
  ])

  return env;
}
