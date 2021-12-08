import {promises} from "fs";
import { normalize } from "path";
import { rootDir } from "../../../../config/app";
import {createDockerCompose} from "./createDockerCompose";
import {createRepos} from "./createRepos";
import {getRoot} from "../getRoot";
import {tryPrintConfig} from "../../prompts/tryPrintConfig";

const { writeFile, readFile, mkdir } = promises;

export async function createWorkstation(config: WorkstationConfiguration, loadedConfig: boolean) {
  const root = getRoot(config.name);
  await mkdir(root, { recursive: true });

  if (!loadedConfig) {
    console.log('Workstation Configurations:', JSON.stringify(config, null, 1));
    await tryPrintConfig(config);
  }

  const compose = await createDockerCompose(config);

  await createRepos(config);

  const typeDest = normalize(`${rootDir}/../src/types.d.ts`);
  const typesDock = await readFile(typeDest, 'utf-8');
  await writeFile(`${root}/docker-compose.ts`, compose);
  await writeFile(`${root}/types.d.ts`, typesDock);
}