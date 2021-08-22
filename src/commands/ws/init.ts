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
    root: await getDirectory('Root Directory?'),
    repos: await getRepos(),
    services: await getServices(),
    env: await getEnv()
  };

  if (!loadedConfig) {
    console.log('Workstation Configurations:', JSON.stringify(config, null, 1));
    await tryPrintConfig(config);
  }

  const compose = createCompose(config);
  console.log('Docker Compose:', JSON.stringify(compose, null, 1));

  if (!await confirmConfig(config, 'Create your workstation?')) {
    return;
  }

  await createRepos(config);
  console.log('Done! Thank you!');
}