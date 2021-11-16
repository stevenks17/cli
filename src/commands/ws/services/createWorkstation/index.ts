import { readFileSync, writeFileSync } from "fs";
import { rootDir } from "../../../../config";
import {createDockerCompose} from "./createDockerCompose";
import {createRepos} from "./createRepos";

export async function createWorkstation(config: WorkstationConfiguration) {
  const compose = await createDockerCompose(config);
  await createRepos(config);
  writeFileSync(`${config.root}/docker-compose.ts`, compose);
  writeFileSync(`${config.root}/types.d.ts`, readFileSync(`${rootDir}/../src/types.d.ts`));
}