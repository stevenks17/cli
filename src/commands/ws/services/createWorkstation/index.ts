import {promises} from "fs";
import { normalize, basename } from "path";
import { rootDir } from "../../../../config/app";
import {createDockerCompose} from "./createDockerCompose";
import {createRepos} from "./createRepos";
import {getRoot} from "../getRoot";
import {tryPrintConfig} from "../../prompts/tryPrintConfig";
import { run } from "@vlegm/utils";

const { writeFile, mkdir, copyFile } = promises;

async function copyFiles(urls: string[], dest:string) {
  return Promise.all(urls.map((url) => copyFile(url, `${dest}/${basename(url)}`)));
}

export async function createWorkstation(config: WorkstationConfiguration, loadedConfig: boolean) {
  const root = getRoot(config.name);
  await mkdir(root, { recursive: true });

  if (!loadedConfig) {
    console.log('Workstation Configurations:', JSON.stringify(config, null, 1));
    await tryPrintConfig(config);
  }

  await createRepos(config);

  const compose = await createDockerCompose(config);
  await writeFile(`${root}/docker-compose.ts`, compose);

  const configDir = `${rootDir}/../src/commands/ws/configs`;
  await copyFiles([
    normalize(`${configDir}/types.d.ts`),
    normalize(`${configDir}/tsconfig.json`),
    normalize(`${configDir}/package.json`)
  ], root);

  await run('yarn', ['install'], {
    cwd: root,
    shell: true
  });
}