import { normalize } from "path";
import { promises } from "fs";
import { Project } from "../../../models/Project";
import { createHash } from "crypto";
import { run } from "@vlegm/utils";
import chalk from "chalk";

const { readFile } = promises;

function dockerComposeTSURL(project: Project) {
  return normalize(`${project.root}/docker-compose.ts`);
}

export async function startProject(project: Project) {
  const file = await readFile(dockerComposeTSURL(project));
  const hashSum = createHash('sha256');
  
  hashSum.update(file);
  const hash = hashSum.digest('hex');

  if(!project.hash || project.hash !== hash) {
    console.log('New docker-compose detected, re-building environment');
    await run('yarn', ['build'], {
      cwd: project.root,
      shell: true
    });

    project.hash = hash;
    await Project.save(project);
  }
}