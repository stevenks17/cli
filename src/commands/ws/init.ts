import { WorkstationConfiguration } from '../../types';
import { getRepos } from './prompts/getRepos';
import { getServices } from './prompts/getServices';
import { getEnv } from './prompts/getEnv';
import { getDirectory } from './prompts/getDirectory';
import { createRepos } from './services/createWorkstation/createRepos';
import { confirm } from './prompts/confirm';
import { tryPrintConfig } from './prompts/tryPrintConfig';
import { tryLoadConfig } from './prompts/tryLoadConfig';
import { createCompose } from './services/createCompose';
import { createWorkstation } from './services/createWorkstation';

export async function init(project: string) {
  let data: WorkstationConfiguration | undefined = await tryLoadConfig(project);
  const loadedConfig = !!data;

  const config = loadedConfig ? data as WorkstationConfiguration : {
    project,
    root: await getDirectory('Root Directory?'),
    repos: await getRepos(),
    services: await getServices(),
    env: await getEnv()
  };

  if (!loadedConfig) {
    console.log('Workstation Configurations:', JSON.stringify(config, null, 1));
    await tryPrintConfig(config);
  }

  if (!await confirm('Create your workstation?')) {
    return;
  }

  await createWorkstation(config);
}