import { Dict, DockerComposeConfig, DockerService, WorkstationConfiguration } from "../../../types";
import { dockerServices } from '../dockerServices';

function getName(gitUrl: string): string | undefined {
  const matches = gitUrl.match(/\/(?<name>.+).git/);

  return matches?.groups?.name;
}

function servicesFromRepos(config: WorkstationConfiguration) {
  if (!config.repos) {
    return {};
  }

  return config.repos.reduce((res, repo) => {
    const name = getName(repo.url);

    if (!name) {
      throw new Error('Unable to parse name, is this a valid git repo?');
    }

    res[name] = {
      tty: true,
      command: 'yarn dev',
      image: 'nodejs:14',
      volumes: [
        `/app:${config.root}/${name}`
      ]
    };

    return res;
  }, {} as Dict<DockerService>)
}

function predefinedServices(config: WorkstationConfiguration) {
  if (!config.services) {
    return {};
  }

  return config.services.reduce((res, service) => {
    res.services = {
      ...res.services,
      [service]: dockerServices[service]
    };

    res.volumes = {
      ...res.volumes,
      [service]: {}
    };

    return res;
  }, {
    services: {},
    volumes: {}
  } as DockerComposeConfig);
}

export function createCompose(config: WorkstationConfiguration) {
  const compose: DockerComposeConfig = {
    version: '3.7'
  };

  const repoServices = servicesFromRepos(config);
  const dockerServices = predefinedServices(config);

  return {
    ...compose,
    services: {
      ...repoServices,
      ...dockerServices.services
    },
    volumes: {
      ...dockerServices.volumes
    }
  };
}