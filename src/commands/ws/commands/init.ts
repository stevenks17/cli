import { getRepos } from '../prompts/getRepos';
import { getServices } from '../prompts/getServices';
import { getEnv } from '../prompts/getEnv';
import { confirm } from '../prompts/confirm';
import { tryLoadConfig } from '../prompts/tryLoadConfig';
import { createWorkstation } from '../services/createWorkstation';
import {Project} from "../models/Project";

export async function init(project: string) {
  let data: WorkstationConfiguration | undefined = await tryLoadConfig(project);
  const loadedConfig = !!data;

  const config = loadedConfig ? data as WorkstationConfiguration : {
    project,
    repos: await getRepos(),
    services: await getServices(),
    env: await getEnv()
  };

  if (!await confirm('Create your workstation?')) {
    return;
  }

  Project.save({
    name: project,
    config
  });

  await createWorkstation(config, loadedConfig);
}