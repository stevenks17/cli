import {promises, readFileSync, writeFileSync} from "fs";
import { rootDir } from "../../../../config";
import {createDockerCompose} from "./createDockerCompose";
import {createRepos} from "./createRepos";
import {getRoot} from "../getRoot";
import {tryPrintConfig} from "../../prompts/tryPrintConfig";

export async function createWorkstation(config: WorkstationConfiguration, loadedConfig: boolean) {
  const root = getRoot(config);
  await promises.mkdir(root, { recursive: true });

  if (!loadedConfig) {
    console.log('Workstation Configurations:', JSON.stringify(config, null, 1));
    await tryPrintConfig(config);
  }

  const compose = await createDockerCompose(config);

  await createRepos(config);
  writeFileSync(`${root}/docker-compose.ts`, compose);
  writeFileSync(`${root}/types.d.ts`, readFileSync(`${rootDir}/../src/types.d.ts`));
}