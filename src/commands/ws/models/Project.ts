import {dataDir} from "../../../config/app";
import { promises, existsSync } from "fs";
import {basename} from "path";
import {JSAML} from "@vlegm/utils";

const { readdir, unlink } = promises;

interface Project {
  name: string;
  root: string;
  config: WorkstationConfiguration;
}

function databaseURL(name:string) {
  return `${dataDir}/${name}.json`;
}

export const Project = {
  async save(project: Project) {
    if(this.has(project.name)) {
      throw new Error(`Project already exists, choose a different name: ${project.name}`);
    }

    return JSAML.save(project, databaseURL(project.name))
  },

  async get(name: string): Promise<Project> {
    return JSAML.read(databaseURL(name)) as Promise<Project>
  },

  has(name: string) {
    return existsSync(databaseURL(name));
  },

  async names(): Promise<string[]> {
    const files = await readdir(dataDir);
    return files.map((file) => basename(file).replace('.json', ''));
  },

  async remove(name: string) {
    await unlink(databaseURL(name));
  }
}