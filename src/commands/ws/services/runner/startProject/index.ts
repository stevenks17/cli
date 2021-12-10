import { normalize } from "path";
import { promises, existsSync } from "fs";
import { Project } from "../../../models/Project";
import { createHash } from "crypto";
import { JSAML, run } from "@vlegm/utils";
import chalk from "chalk";
import { generateDockerCompose } from "../../generateDockerCompose";
import { stringify } from "querystring";

const { readFile, writeFile } = promises;

function dockerComposeTSURL(project: Project) {
  return normalize(`${project.root}/docker-compose.ts`);
}

function needsRebuild(hash: string, project: Project) {
  return !project.hash || project.hash !== hash || !existsSync(`${project.root}/dist`) || !existsSync(`${project.root}/docker-compose.yaml`);
}

export async function startProject(project: Project, environment = 'master') {
  const file = await readFile(dockerComposeTSURL(project));
  const hashSum = createHash('sha256');
  
  hashSum.update(file);
  const hash = hashSum.digest('hex');

  if(needsRebuild(hash, project)) {
    console.log('Building environment');
    await run('yarn', ['build'], {
      cwd: project.root,
      shell: true
    });

    project.hash = hash;
    await Project.save(project);
  }

  const isTest = environment === 'test';
  const branch = isTest ? 'master' : environment;

  console.log(`Configuring for: ${chalk.greenBright(branch)}`);
  const config:DockerComposeConfig = require(`${project.root}/dist/docker-compose.js`).default;
  const dockerCompose = generateDockerCompose(config, 'development', {
    test: isTest,
  });
  await JSAML.save(dockerCompose, `${project.root}/docker-compose.yaml`);

  console.log(`Starting ${chalk.yellow('services')}!!`);
  await run('docker-compose', ['up'], {
    cwd: project.root
  });
}