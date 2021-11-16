import { readFileSync, writeFileSync } from "fs";
import { rootDir } from "../../../../config";
import {createDockerCompose} from "./createDockerCompose";
import {createRepos} from "./createRepos";
import {getRoot} from "../getRoot";

export async function createWorkstation(config: WorkstationConfiguration) {
  const compose = await createDockerCompose(config);
  const root = getRoot(config);
  await createRepos(config);
  writeFileSync(`${root}/docker-compose.ts`, compose);
  writeFileSync(`${root}/types.d.ts`, readFileSync(`${rootDir}/../src/types.d.ts`));
}