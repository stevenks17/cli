import {promises} from "fs";
import { rootDir } from "../../../../config/app";
import {createDockerCompose} from "./createDockerCompose";
import {createRepos} from "./createRepos";
import {getRoot} from "../getRoot";
import {tryPrintConfig} from "../../prompts/tryPrintConfig";

const { writeFile, readFile, mkdir } = promises;

export async function createWorkstation(config: WorkstationConfiguration, loadedConfig: boolean) {
  const root = getRoot(config);
  await mkdir(root, { recursive: true });

  if (!loadedConfig) {
    console.log('Workstation Configurations:', JSON.stringify(config, null, 1));
    await tryPrintConfig(config);
  }

  const compose = await createDockerCompose(config);

  await createRepos(config);

  const typesDock = await readFile(`${rootDir}/../src/types.d.ts`, 'utf-8');
  await writeFile(`${root}/docker-compose.ts`, compose);
  await writeFile(`${root}/types.d.ts`, typesDock);
}