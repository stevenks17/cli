import { Dict, WorkstationConfiguration } from '../../types';
import { getRepos } from './prompts/getRepos';
import { getServices } from './prompts/getServices';
import { getEnv } from './prompts/getEnv';
import { getRoot } from './prompts/getRoot';
import { createRepos } from './services/createWorkstation/createRepos';
import { confirmConfig } from './prompts/confirmConfig';
import { askAndPrintConfig } from './prompts/askAndPrintConfig';

export async function init(project: string) {
  const config: WorkstationConfiguration = {
    project,
    repos: await getRepos(),
    services: await getServices(),
    env: await getEnv(),
    root: await getRoot()
  };

  if (!await confirmConfig(config)) {
    return;
  }

  await askAndPrintConfig(config);

  //await createRepos(config);

  console.log('done', config);
}