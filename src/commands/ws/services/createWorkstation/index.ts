import { readFileSync, writeFileSync } from "fs";
import { render } from 'ejs';
import { createCompose } from "./createCompose";
import { createRepos } from "./createRepos";
import { rootDir } from "./../../../../config";

export async function createWorkstation(config: WorkstationConfiguration) {
  const compose = createCompose(config);
  await createRepos(config);
  const template = readFileSync(`${rootDir}/../templates/docker-compose.ts.ejs`, 'utf-8');
  const compiled = render(template, compose);
  writeFileSync(`${config.root}/docker-compose.ts`, compiled);
  writeFileSync(`${config.root}/types.d.ts`, readFileSync(`${rootDir}/../src/types.d.ts`))
}