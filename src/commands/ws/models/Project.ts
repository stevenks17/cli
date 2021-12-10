import {dataDir} from "../../../config/app";
import { promises, existsSync } from "fs";
import {basename} from "path";
import {JSAML} from "@vlegm/utils";

const { readdir, unlink, mkdir } = promises;

export interface Project {
  name: string;
  root: string;
  hash?: string;
  config: WorkstationConfiguration;
}

function dataURL(name:string) {
  return `${dataDir}/${name}`;
}
function projectURL(name:string) {
  return `${dataURL(name)}/project.json`;
}

export const Project = {
  async save(project: Project) {
    if(!existsSync(dataURL(project.name))) {
      await mkdir(dataURL(project.name));
    }

    if(this.has(project.name)) {
      throw new Error(`Project already exists, choose a different name: ${project.name}`);
    }

    return JSAML.save(project, projectURL(project.name))
  },

  async get(name: string): Promise<Project> {
    return JSAML.read(projectURL(name)) as Promise<Project>
  },

  has(name: string) {
    return existsSync(projectURL(name));
  },

  async names(): Promise<string[]> {
    const files = await readdir(dataDir);
    return files.map((file) => basename(file).replace('.json', ''));
  },

  async remove(name: string) {
    await unlink(projectURL(name));
  }
}