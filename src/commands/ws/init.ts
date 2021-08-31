import { promises } from 'fs';
import { getRepos } from './prompts/getRepos';
import { getServices } from './prompts/getServices';
import { getEnv } from './prompts/getEnv';
import { confirm } from './prompts/confirm';
import { tryPrintConfig } from './prompts/tryPrintConfig';
import { tryLoadConfig } from './prompts/tryLoadConfig';
import { createWorkstation } from './services/createWorkstation';
import { db } from '../../config/db';

export async function init(project: string) {
  let data: WorkstationConfiguration | undefined = await tryLoadConfig(project);
  const loadedConfig = !!data;

  const config = loadedConfig ? data as WorkstationConfiguration : {
    project,
    root: `${process.cwd()}/${project}`,
    repos: await getRepos(),
    services: await getServices(),
    env: await getEnv()
  };

  db.push('root/projects', { [config.project]: config }, false);
  db.push('root/project-names', [config.project], false);
  
  await promises.mkdir(config.root as string, { recursive: true });

  if (!loadedConfig) {
    console.log('Workstation Configurations:', JSON.stringify(config, null, 1));
    await tryPrintConfig(config);
  }

  if (!await confirm('Create your workstation?')) {
    return;
  }

  await createWorkstation(config);
}