import { WorkstationConfiguration } from '../../types';
import { getRepos } from './prompts/getRepos';
import { getServices } from './prompts/getServices';
import { getEnv } from './prompts/getEnv';
import { getDirectory } from './prompts/getDirectory';
import { createRepos } from './services/createWorkstation/createRepos';
import { confirmConfig } from './prompts/confirmConfig';
import { tryPrintConfig } from './prompts/tryPrintConfig';
import { tryLoadConfig } from './prompts/tryLoadConfig';
import { createCompose } from './services/createCompose';

export async function init(project: string) {
  let data: WorkstationConfiguration | undefined = await tryLoadConfig(project);
  const loadedConfig = !!data;

  const config = loadedConfig ? data as WorkstationConfiguration : {
    project,
    repos: await getRepos(),
    services: await getServices(),
    env: await getEnv(),
    root: await getDirectory('Root Directory?')
  };

  if (!await confirmConfig(config, 'Would you like create your workstation?')) {
    return;
  }

  if (!loadedConfig) {
    await tryPrintConfig(config);
  }

  const compose = createCompose(config);
  if (!await confirmConfig(compose, 'This is the docker compose that was created, continue?')) {
    return;
  }

  //await createRepos(config);

  console.log('done', config);
}