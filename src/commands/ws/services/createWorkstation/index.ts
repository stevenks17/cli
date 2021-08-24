import { WorkstationConfiguration } from "../../../../types";
import { createCompose } from "./createCompose";
import { createRepos } from "./createRepos";

export async function createWorkstation(config: WorkstationConfiguration) {
  const compose = createCompose(config);
  console.log('Docker Compose:', JSON.stringify(compose, null, 1));

  await createRepos(config);

}