import inquirer from 'inquirer';
import chalk from 'chalk';
import { RepoInfo } from '../../../types';

export async function getRepos(): Promise<RepoInfo[]> {
  if (!await shouldAddRepos()) {
    return [];
  }

  return recursiveAskForRepo();
}

async function shouldAddRepos() {
  const { shouldAdd } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldAdd',
      message: 'Would you like to add repos to the workstation?'
    }
  ]);

  return shouldAdd;
}

async function recursiveAskForRepo(answers: RepoInfo[] = []): Promise<RepoInfo[]> {
  const { url } = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: `Enter a git repo (\'end\' to ${chalk.red('stop')})`
    }
  ])

  if (url === 'end') {
    return answers;
  }

  const { init } = await inquirer.prompt([
    {
      type: 'input',
      name: 'init',
      message: 'Initialization command:',
      default: 'yarn install'
    }
  ])

  if (init === 'end') {
    return answers;
  }

  answers.push({ url, init });
  return recursiveAskForRepo(answers);
}