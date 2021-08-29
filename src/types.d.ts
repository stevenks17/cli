interface Dict<T> {
  [key: string]: T | undefined;
}

interface RepoInfo {
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

interface CommandOptions {
  test: boolean;
}

interface EnvironmentServiceMeta {
  command: (env: string, options: CommandOptions) => string | string[];
  image: (env: string) => string;
}

type RepoService = Omit<DockerService, keyof EnvironmentServiceMeta> & EnvironmentServiceMeta;

interface DockerVolume {

}

interface DockerComposeConfig {
  version?: string;
  services?: Dict<DockerService | RepoService>;
  volumes?: Dict<DockerVolume>;
}