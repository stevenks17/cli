interface Dict<T> {
  [key: string]: T | undefined;
}

export interface RepoInfo {
  url: string;
  init: string;
}

interface WorkstationConfiguration {
  project: string;
  root?: string;
  repos?: RepoInfo[];
  services?: string[];
  env?: Dict<string>;
}

interface DockerService {
  env_file?: string;
  environment?: string[];
  tty?: boolean;
  command?: string | string[];
  ports?: string[];
  volumes?: string[];
  working_dir?: string;
  image: string;
}

interface EnvironmentServiceMeta {
  command: (env: string, options?: { test: boolean }) => string | string[];
  image: (env: string) => string;
}

export type RepoService = Omit<DockerService, keyof EnvironmentServiceMeta> & EnvironmentServiceMeta;

interface DockerVolume {

}

export interface DockerComposeConfig {
  version?: string;
  services?: Dict<DockerService>;
  repoServices?: Dict<DockerService>
  volumes?: Dict<DockerVolume>
}