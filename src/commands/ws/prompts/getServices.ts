import inquirer from 'inquirer';

export async function getServices(): Promise<string[]> {
  const { services } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'services',
      message: 'Choose predefined services to add:',
      choices: [
        'mysql', 'elasticsearch', 'postgres', 'redis'
      ]
    }
  ])

  return services;
}
