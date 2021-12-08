import { getRepos } from '../prompts/getRepos';
import { getServices } from '../prompts/getServices';
import { getEnv } from '../prompts/getEnv';
import { confirm } from '../prompts/confirm';
import { tryLoadConfig } from '../prompts/tryLoadConfig';
import { createWorkstation } from '../services/createWorkstation';
import {Project} from "../models/Project";
import { getRoot } from '../services/getRoot';

export async function init(name: string) {
  let data: WorkstationConfiguration | undefined = await tryLoadConfig(name);
  const loadedConfig = !!data;

  const config = loadedConfig ? data as WorkstationConfiguration : {
    name,
    repos: await getRepos(),
    services: await getServices(),
    env: await getEnv()
  };

  if (!await confirm('Create your workstation?')) {
    return;
  }

  await Project.save({
    name,
    root: getRoot(name),
    config
  });

  await createWorkstation(config, loadedConfig);
}